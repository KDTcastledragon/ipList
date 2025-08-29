import './Log.css';

import { useEffect, useState } from 'react';
import axios from 'axios';


function Log() {
    const [enteredWord, setEnteredWord] = useState('');
    const [selectedOpt, setSelectedOpt] = useState('');
    const [logData, setLogData] = useState([]);
    const [selectedAssetsData, setSelectedAssetsData] = useState(null);

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            // setModifyWindow(false);
        }
    };


    //==[2. 외부장비 목록 & 모달창 오픈시에 자동으로 Esc 키 이벤트를 감지하도록 설정]=============================================================
    useEffect(() => {
        axios
            .get(`/extDev/selectLogs`)
            .then((r) => {
                setLogData(r.data);
                console.log('성공:', JSON.stringify(r.data, null, 2));
                console.table(r.data);
                // alert(`성공ExtDev`);
            }).catch((e) => {
                console.log(`${e.message}`);
                alert(`Failed_ExtDev`);
            })

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);

    function selectLogs() {
        axios
            .get(`/extDev/searchWordLog?logWord=${enteredWord}`)
            .then((r) => {
                setLogData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    function optSearch() {
        axios
            .get(`/extDev/searchWordLog?word=${selectedOpt}`)
            .then((r) => {
                setLogData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    return (
        <div className='ExtDevLogContainer'>
            <div className='searchAddBox'>
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => selectLogs(enteredWord)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select value={selectedOpt} onChange={(e) => setSelectedOpt(e.target.value)}>
                    <option value="USB">USB</option>
                    <option value="카드리더기">카드리더기</option>
                    <option value="외장하드">외장하드</option>
                </select>
                <button onClick={() => optSearch(selectedOpt)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" />
                &nbsp;&nbsp;&nbsp;&nbsp;<span>~</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" />
                <button onClick={() => optSearch(selectedOpt)}>검색</button>

            </div>
            <table className='extDevLogTable'>
                <thead>
                    <tr>
                        <th>기록구분</th>
                        <th>관리번호</th>
                        <th>장비종류</th>
                        <th>DLP등록</th>
                        <th>DLP통제</th>
                        <th>사번</th>
                        <th>사용자</th>
                        <th>부서</th>
                        <th>모델(CMD)</th>
                        <th>시리얼(CMD)</th>
                        <th>모델(DLP)</th>
                        <th>시리얼(DLP)</th>
                        <th>허용만료일</th>
                        <th>사용목적</th>
                        <th>위치</th>
                        <th>용량</th>
                        <th>제조사</th>
                        <th>비고</th>
                        <th>변경</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {logData && logData.length > 0 ?
                        (logData.map((d, i) => (
                            <tr key={i} className='extDevLogTableTr'>
                                <td>{d.log_type}</td>
                                <td>{d.dev_id}</td>
                                <td>{d.dev_type}</td>
                                <td>{d.registered_dlp}</td>
                                <td>{d.controlled_dlp}</td>
                                <td>{d.emp_id === null ? '-' : d.emp_id}</td>
                                <td>{d.emp_name}</td>
                                <td>{d.dept_name}</td>
                                <td>{d.location}</td>
                                <td>{d.valid_date}</td>
                                <td>{d.usage_purpose}</td>
                                <td>{d.cmd_model}</td>
                                <td>{d.cmd_serial_num}</td>
                                <td>{d.dlp_model}</td>
                                <td>{d.dlp_serial_num}</td>
                                <td>{d.capacity === null ? '-' : d.capacity}</td>
                                <td>{d.manufacturer}</td>
                                <td>{d.notes}</td>
                                <td>{d.log_timestamp}</td>
                            </tr>

                        )))
                        :
                        <div>데이터 없음</div>
                    }
                </tbody>
            </table>


        </div>
    );
}

export default Log;