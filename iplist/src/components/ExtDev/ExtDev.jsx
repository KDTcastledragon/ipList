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

    function searchWord() {
        axios
            .get(`/extDev/searchWord?word=${enteredWord}`)
            .then((r) => {
                setExtDevData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    function optSearch() {
        axios
            .get(`/extDev/searchWord?word=${selectedOpt}`)
            .then((r) => {
                setExtDevData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    return (
        <div className='ExtDevContainer'>
            <div className='searchAddBox'>
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => searchWord(enteredWord)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                    value={selectedOpt}
                    onChange={(e) => {
                        setSelectedOpt(e.target.value);
                        // optSearch(e.target.value);
                    }}
                >
                    <option value="USB">USB</option>
                    <option value="카드리더기">카드리더기</option>
                    <option value="외장하드">외장하드</option>
                </select>
                <button onClick={() => optSearch(selectedOpt)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => setAddModalWindow(true)}>신규장비 등록</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <table className='extDevTable'>
                <thead>
                    <tr>
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
                    {extDevData && extDevData.length > 0 ?
                        (extDevData.map((d, i) => (
                            <tr key={i} className='extDevTableTr'>
                                <td>{d.dev_id}</td>
                                <td>
                                    <span onClick={() => modifyAssets(d)}>{d.dev_type}</span>
                                </td>
                                <td>{d.registered_dlp === true ? 'O' : 'X'}</td>
                                <td>{d.controlled_dlp === true ? 'O' : 'X'}</td>
                                <td>{d.emp_id === null ? '-' : d.emp_id}</td>
                                <td>{d.emp_name}</td>
                                <td>{d.dept_name}</td>
                                <td>{d.cmd_model}</td>
                                <td>{d.cmd_serial_num}</td>
                                <td>{d.dlp_model}</td>
                                <td>{d.dlp_serial_num}</td>
                                <td>{d.valid_date}</td>
                                <td>{d.usage_purpose}</td>
                                <td>{d.location}</td>
                                <td>{d.capacity === null ? '-' : d.capacity > 512 ? `${d.capacity / 1024}TB` : `${d.capacity}GB`}</td>
                                <td>{d.manufacturer}</td>
                                <td>{d.notes}</td>
                                <td><div><button onClick={() => modifyAssets(d)}>변경</button></div></td>
                            </tr>

                        )))
                        :
                        <div>데이터 없음</div>
                    }
                </tbody>
            </table>


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