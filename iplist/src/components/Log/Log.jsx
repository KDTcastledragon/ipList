import './Log.css';

import { useEffect, useState } from 'react';
import axios from 'axios';


function Log() {
    const [enteredWord, setEnteredWord] = useState('');
    const [selectedOpt, setSelectedOpt] = useState('');
    const [logData, setLogData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isAllPeriod, setIsAllPeriod] = useState(false);

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            // setModifyWindow(false);
        }
    };


    //==[2. 외부장비 목록 & 모달창 오픈시에 자동으로 Esc 키 이벤트를 감지하도록 설정]=============================================================
    useEffect(() => {
        axios
            .get(`/extDev/allLogs`)
            .then((r) => {
                setLogData(r.data);
                console.log('성공:', JSON.stringify(r.data, null, 2));
                console.table(r.data);
                // alert(`성공ExtDev`);
            }).catch((e) => {
                console.log(`${e.message}`);
                alert(`로그 실패`);
            })

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);

    // =====[formatter]===============================================================
    function fmatTs(ts) {
        const [date, time] = ts.split('T'); // T를 기준으로 쪼개기
        const fdate = date.slice(2); // 25-08-31 형태.
        return `${fdate} . ${time}`
    }

    const fmatPurAndNote = (text) => {
        if (!text) { return "-"; }  // text === null || text === undefined

        if (text.length >= 22) {
            const arrIdx = text.indexOf("▶");
            if (arrIdx !== -1) {
                let left = text.slice(0, arrIdx);
                if (left.length >= 8) {
                    left = text.slice(0, 8);
                }
                const right = text.slice(arrIdx + 1, arrIdx + 1 + 8);

                return `${left}... ▶ ${right}...`;

            } else {
                return `${text.slice(0, 16)}...`;
            }
        } else {
            return `${text}`;
        }
    }

    const isNullHyphen = (data) => {
        if (!data) { return `-`; }
        else { return data }
    }


    // ==========================================================================
    function selectLogs() {
        const data = {
            startDate: startDate === '' ? null : startDate,
            endDate: endDate === '' ? null : endDate,
            selectedOpt: selectedOpt,
            logWord: enteredWord
        }

        axios
            .post(`/extDev/selectLogs`, data)
            .then((r) => {
                setLogData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    const resetSearch = () => {
        setStartDate('');
        setEndDate('');
        setSelectedOpt('');
        setEnteredWord('');
    }

    const handlePeriod = () => {
        setIsAllPeriod(!isAllPeriod);
        setStartDate(null);
        setEndDate(null);
    }

    //=============================================================================================================
    return (
        <div className='ExtDevLogContainer'>
            <div className='searchLogBox'>
                <button onClick={() => handlePeriod()} className={`isAllPeriod ${isAllPeriod ? 'trueAllPd' : ''}`}>전체기간</button>
                {/* <span className={isAllPeriod ? 'trueAllPd' : 'falseAllPd'}>전체기간</span> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} disabled={isAllPeriod} />
                &nbsp;&nbsp;&nbsp;&nbsp;<span>~</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} disabled={isAllPeriod} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select value={selectedOpt} onChange={(e) => setSelectedOpt(e.target.value)}>
                    <option value="">전체</option>
                    <option value="USB">USB</option>
                    <option value="카드리더기">카드리더기</option>
                    <option value="외장하드">외장하드</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => selectLogs(enteredWord)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => resetSearch()}>초기화</button>
            </div>
            <div className='extDevLogTableSection'>
                <table className='extDevLogTable'>
                    <tbody>
                        <tr className='extDevLogTableTrThead'>
                            <td>구분</td>
                            <td>관리번호</td>
                            <td>장비종류</td>
                            <td>DLP등록</td>
                            <td>DLP통제</td>
                            <td>사용구분</td>
                            <td>사번</td>
                            <td>사용자</td>
                            <td>부서</td>
                            <td>위치</td>
                            <td>허용만료일</td>
                            <td>사용목적</td>
                            <td>모델(CMD)</td>
                            <td>시리얼(CMD)</td>
                            <td>모델(DLP)</td>
                            <td>시리얼(DLP)</td>
                            <td>용량</td>
                            <td>제조사</td>
                            <td>비고</td>
                            <td>관리자</td>
                            <td>관리일자</td>
                        </tr>
                        {logData && logData.length > 0 ?
                            (logData.map((d, i) => (
                                <tr key={i} className='extDevLogTableTr'>
                                    <td>{d.log_type}</td>
                                    <td>{d.dev_id}</td>
                                    <td>{d.dev_type}</td>
                                    <td>{d.registered_dlp}</td>
                                    <td>{d.controlled_dlp}</td>
                                    <td>{d.dev_status}</td>
                                    <td>{isNullHyphen(d.emp_id)}</td>
                                    <td>{isNullHyphen(d.emp_name)}</td>
                                    <td>{isNullHyphen(d.dept_name)}</td>
                                    <td>{isNullHyphen(d.location)}</td>
                                    <td>{isNullHyphen(d.valid_date)}</td>
                                    <td title={d.usage_purpose}>{fmatPurAndNote(d.usage_purpose)}</td>
                                    {/* <td>
                                    {fmatPurAndNote(d.usage_purpose)}
                                    </td> */}
                                    <td>{isNullHyphen(d.cmd_model)}</td>
                                    <td>{isNullHyphen(d.cmd_serial_num)}</td>
                                    <td>{isNullHyphen(d.dlp_model)}</td>
                                    <td>{isNullHyphen(d.dlp_serial_num)}</td>
                                    <td>{d.capacity === null ? '-' : d.capacity}</td>
                                    <td>{d.manufacturer}</td>
                                    <td title={d.notes}>{fmatPurAndNote(d.notes)}</td>
                                    {/* <td>
                                    {fmatPurAndNote(d.notes)}
                                    </td> */}
                                    <td>{d.admin_id}</td>
                                    <td>{d.log_timestamp === null ? '-' : fmatTs(d.log_timestamp)}</td>
                                </tr>

                            )))
                            :
                            <td className='noDataInDB' colSpan={21}>데이터 없음</td>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Log;