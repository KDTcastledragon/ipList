import './Assets.css';
import axios from 'axios';

import ModifyModal from './ModifyModal';
import AddModal from './AddModal';
import { useEffect, useState } from 'react';


function Assets() {
    const [enteredWord, setEnteredWord] = useState('');
    const [assetsData, setAssetsData] = useState([]);
    const [selectedAssetsData, setSelectedAssetsData] = useState(null);
    const [modifyWindow, setModifyWindow] = useState(false);
    const [addModalWindow, setAddModalWindow] = useState(false);

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            setModifyWindow(false);
        }
    };


    //==[2. 모달창 오픈시에 자동으로 Esc 키 이벤트를 감지하도록 설정]=============================================================
    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);


    function allAssets() {
        axios
            .get(`/asset/allAssets`)
            .then((r) => {
                alert(`올 에셋 성공`);
                setAssetsData(r.data);
            }).catch((e) => {
                alert(`${e.message}`);
            })
    }

    function modifyAssets(data) {
        setModifyWindow(true);
        setSelectedAssetsData(data);
    }

    function searchWord() {
        axios
            .get(`/asset/searchWord=${enteredWord}`)
            .then((r) => {
                setAssetsData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    return (
        <div className='AssetContainer'>

            <div>
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => searchWord(enteredWord)}>검색</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => allAssets()}>모든 자산</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => setAddModalWindow(true)}>자산추가</button>
            </div>
            <table className='assetTable'>
                <thead>
                    <tr>
                        <th>관리번호</th>
                        <th>품목</th>
                        <th>등급</th>
                        <th>사용자</th>
                        <th>사원번호</th>
                        <th>소속</th>
                        <th>부서</th>
                        <th>위치</th>
                        <th>구매일</th>
                        <th>만료일</th>
                        <th>구분</th>
                        <th>비용</th>
                        <th>IP주소</th>
                        <th>사용</th>
                        <th>모델</th>
                        <th>시리얼</th>
                        <th>교체</th>
                        <th>비고</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {assetsData && assetsData.length > 0 ?
                        (assetsData.map((d, i) => (
                            <tr key={i} className='assetTableTr'>
                                <td>{d.asset_id}</td>
                                <td>
                                    <div>
                                        <button onClick={() => modifyAssets(d)}>{d.asset_type}</button>
                                    </div>
                                </td>
                                <td>{d.grade}</td>
                                <td>{d.emp_name}</td>
                                <td>{d.emp_id}</td>
                                <td>{d.org_name}</td>
                                {/* <td>{d.dept_id}</td> */}
                                <td>{d.dept_name}</td>
                                <td>{d.location}</td>
                                <td>{d.pur_date}</td>
                                <td>{d.exp_date}</td>
                                <td>{d.owns_type}</td>
                                <td>{d.cost}</td>
                                <td>{d.ipv4_octet1}.{d.ipv4_octet2}.{d.ipv4_octet3}.{d.ipv4_octet4}</td>
                                <td>{d.usage_type}</td>
                                <td>{d.model}</td>
                                <td>{d.serial_num}</td>
                                <td>{d.repl_date === d.pur_date ? '-' : d.repl_date}</td>
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
                <ModifyModal
                    d={selectedAssetsData}
                    setModifyWindow={setModifyWindow}
                />
            )}

            {addModalWindow && (
                <AddModal
                    setAddModalWindow={setAddModalWindow}
                />
            )
            }
        </div>
    );
}

export default Assets;