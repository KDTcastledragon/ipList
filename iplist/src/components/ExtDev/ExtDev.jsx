import './ExtDev.css';
import axios from 'axios';

import ModifyExtDevModal from './ModifyExtDevModal';
import AddExtDevModal from './AddExtDevModal';
import { useEffect, useState } from 'react';


function ExtDev() {
    const [enteredWord, setEnteredWord] = useState('');
    const [selectedOpt, setSelectedOpt] = useState('');
    const [extDevData, setExtDevData] = useState([]);
    const [selectedAssetsData, setSelectedAssetsData] = useState(null);
    const [modifyWindow, setModifyWindow] = useState(false);
    const [addModalWindow, setAddModalWindow] = useState(false);
    const administratorId = sessionStorage.getItem('adminId');


    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            setModifyWindow(false);
        }
    };


    //==[2. 외부장비 목록출력 & 모달창 오픈시에 자동으로 Esc 키 이벤트를 감지하도록 설정]=============================================================
    useEffect(() => {
        axios
            .get(`/extDev/allExtDevs`)
            .then((r) => {
                setExtDevData(r.data);
                console.log(`성공`);
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

    //==[ 외부장비 정보 수정 ]=============================================================
    function modifyAssets(data) {
        setModifyWindow(true);
        setSelectedAssetsData(data);
    }

    function searchExtDev() {
        const data = {
            word: enteredWord,
            devType: selectedOpt
        }
        axios
            .post(`/extDev/searchExtDev`, data)
            .then((r) => {
                setExtDevData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    const fmatPurAndNote = (text) => {
        if (!text) { return "-"; }  // text === null || text === undefined

        if (text.length >= 20) {
            const sliced = text.slice(0, 16);

            return `${sliced}...`;
        } else {
            return text;
        }
    }

    const resetSearch = () => {
        setEnteredWord('');
        setSelectedOpt('');
    }

    const isNullHyphen = (data) => {
        if (!data) { return `-`; }
        else { return data }
    }

    // ==========================================================================================================================
    return (
        <div className='ExtDevContainer'>
            <div className='searchAddBox'>
                <select value={selectedOpt} onChange={(e) => { setSelectedOpt(e.target.value); }}>
                    <option value="">전체</option>
                    <option value="USB">USB</option>
                    <option value="카드리더기">카드리더기</option>
                    <option value="외장하드">외장하드</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => searchExtDev(enteredWord)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => resetSearch()}>초기화</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <button className='addExtDevButton' onClick={() => setAddModalWindow(true)}>신규장비 등록</button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => searchExtDev('ONLY_DISCARDED_EXT_DEV_SEARCH')}>폐기장비 검색</button>
            </div>
            <div className='extDevTableSection'>
                <table className='extDevTable'>
                    <tbody>
                        <tr>
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
                            <td>변경</td>
                        </tr>
                        {extDevData && extDevData.length > 0 ?
                            (extDevData.map((d, i) => {
                                const isUsing = [d.emp_id, d.emp_name, d.dept_id, d.dept_name, d.location].some(Boolean);
                                return (
                                    <tr key={i} className='extDevTableTr'>
                                        <td>{d.dev_id}</td>
                                        <td onClick={() => modifyAssets(d)}>{d.dev_type}</td>
                                        <td>{d.registered_dlp === true ? 'O' : 'X'}</td>
                                        <td>{d.controlled_dlp === true ? 'O' : 'X'}</td>
                                        <td>{d.dev_status}</td>
                                        <td className={isUsing ? 'isUsingExtDev' : ''}>{isNullHyphen(d.emp_id)}</td>
                                        <td className={isUsing ? 'isUsingExtDev' : ''}>{isNullHyphen(d.emp_name)}</td>
                                        <td className={isUsing ? 'isUsingExtDev' : ''}>{isNullHyphen(d.dept_name)}</td>
                                        <td className={isUsing ? 'isUsingExtDev' : ''}>{isNullHyphen(d.location)}</td>
                                        <td>{isNullHyphen(d.valid_date)}</td>
                                        <td title={d.usage_purpose}>{fmatPurAndNote(d.usage_purpose)}</td>
                                        <td>{isNullHyphen(d.cmd_model)}</td>
                                        <td>{isNullHyphen(d.cmd_serial_num)}</td>
                                        <td>{isNullHyphen(d.dlp_model)}</td>
                                        <td>{isNullHyphen(d.dlp_serial_num)}</td>
                                        <td>{d.capacity === null ? '-' : d.capacity > 512 ? `${Math.floor(d.capacity / 1024)}TB` : `${Math.floor(d.capacity)}GB`}</td>
                                        <td>{isNullHyphen(d.manufacturer)}</td>
                                        <td title={d.notes}>{fmatPurAndNote(d.notes)}</td>
                                        <td className='modifyButton'><div><button onClick={() => modifyAssets(d)}>변경</button></div></td>
                                    </tr>
                                )
                            }))
                            :
                            <td className='noDataInDB' colSpan={19}>데이터 없음</td>
                        }
                    </tbody>
                </table>
            </div>


            {modifyWindow && (
                <ModifyExtDevModal
                    d={selectedAssetsData}
                    setModifyWindow={setModifyWindow}
                />
            )}

            {addModalWindow && (
                <AddExtDevModal
                    setAddModalWindow={setAddModalWindow}
                />
            )
            }
        </div>
    );
}

export default ExtDev;