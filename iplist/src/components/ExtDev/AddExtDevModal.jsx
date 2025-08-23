import './AddExtDevModal.css';
import './ModalCommon.css';

import axios from 'axios';
import { useState, useEffect } from 'react';

function AddExtDevModal({ setAddModalWindow }) {

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            setAddModalWindow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);

    const [devId, setDevId] = useState();
    const [devType, setDevType] = useState();
    const [registeredDlp, setRegisteredDlp] = useState(0);
    const [controlledDlp, setControlledDlp] = useState(0);
    const [empId, setEmpId] = useState();
    const [empName, setEmpName] = useState();
    const [empList, setEmpList] = useState();
    const [deptId, setDeptId] = useState();
    const [deptName, setDeptName] = useState();
    const [cmdModel, setCmdModel] = useState();
    const [cmdSerialNum, setCmdSerialNum] = useState();
    const [dlpModel, setDlpModel] = useState();
    const [dlpSerialNum, setDlpSerialNum] = useState();
    const [capacity, setCapacity] = useState();
    const [manufacturer, setManufacturer] = useState();
    const [usagePurpose, setUsagePurpose] = useState();
    const [location, setLocation] = useState();
    const [purDate, setPurDate] = useState();
    const [validDate, setValidDate] = useState();
    const [cost, setCost] = useState();
    const [notes, setNotes] = useState();

    function cancelAddExtDev() {
        setAddModalWindow(false);
    }

    // const showEmpList = async (e) => {
    //     const value = e.target.value;
    //     setEmpName(value);

    //     if (value !== null && value.length > 1) {
    //         try {
    //             const response = await axios.get(`/emp/showEmpList?emp=${empName}`);
    //             setEmpList(response.data);
    //         } catch (e) {
    //             console.log(`failed EMp LIST`);
    //         }
    //     }
    // }

    function addExtDev() {
        const extDevData = {
            devId: devId,
            devType: devType,
            registeredDlp: registeredDlp,
            controlledDlp: controlledDlp,
            empId: empId,
            empName: empName,
            deptId: deptId,
            deptName: deptName,
            cmdModel: cmdModel,
            cmdSerialNum: cmdSerialNum,
            dlpModel: dlpModel,
            dlpSerialNum: dlpSerialNum,
            capacity: capacity,
            manufacturer: manufacturer,
            usagePurpose: usagePurpose,
            location: location,
            purDate: purDate,
            validDate: validDate,
            cost: cost,
            notes: notes
        };

        axios
            .post(`/extDev/addExtDev`, extDevData)
            .then(() => {
                alert('외부저장장치 등록 성공');
                // setAddModalWindow(false); // 모달 닫기
            })
            .catch((e) => {
                alert(`등록 실패: ${e.message}`);
            });
    }

    return (
        <div className='ExtDevModalWindowBackGround'>
            <div className='ExtDevModalContainer'>
                <div className='closeExtDevModalBox' >
                    <button onClick={() => setAddModalWindow(false)}>X</button>
                </div>
                <div className='addExtDevTitle'><span>신규장비 등록</span></div>
                <div className='insertExtDevData'>
                    <div className='insertDataLeft'>
                        <div className='devId'>
                            <span>관리번호 : </span>
                            <input type="text" value={devId} onChange={(e) => setDevId(e.target.value)} />
                        </div>
                        <div className='devType'>
                            <span>장비종류 : </span>
                            <select value={devType} onChange={(e) => setDevType(e.target.value)}>
                                <option value="USB">USB</option>
                                <option value="카드리더기">카드리더기</option>
                                <option value="외장하드">외장하드</option>
                            </select>
                        </div>
                        <div>
                            <span>DLP등록여부 : </span>
                            <select value={registeredDlp} onChange={(e) => setRegisteredDlp(e.target.value)}>
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>DLP통제여부 : </span>
                            <select value={controlledDlp} onChange={(e) => setControlledDlp(e.target.value)}>
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>사번 : </span>
                            <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                        </div>
                        <div>
                            <span>사용자 : </span>
                            <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} />
                            {/* <input type="text" value={empName} onChange={showEmpList} /> */}
                            {/* {empList.length > 0 && (
                                <ul>
                                    {empList.map((d, i) => (
                                        <li
                                            key={i}
                                            onClick={() => {
                                                setEmpName(d.emp_name);
                                                setEmpId(d.emp_id);
                                            }} >
                                            {d.empId}/{d.empName}
                                        </li>
                                    ))}
                                </ul>
                            )} */}
                        </div>
                        <div>
                            <span>부서 : </span>
                            <input type="text" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
                        </div>
                        <div>
                            <span>위치 : </span>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div>
                            <span>사용 목적 : </span>
                            <textarea name="" id="" value={usagePurpose} onChange={(e) => setUsagePurpose(e.target.value)}></textarea>
                        </div>
                    </div> {/**============================= DataLeft=====================================  */}

                    <div className='insertDataRight'>
                        <div>
                            <span>모델(CMD) : </span>
                            <input type="text" value={cmdModel} onChange={(e) => setCmdModel(e.target.value)} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={cmdSerialNum} onChange={(e) => setCmdSerialNum(e.target.value)} />
                        </div>
                        <div>
                            <span>모델(DLP) : </span>
                            <input type="text" value={dlpModel} onChange={(e) => setDlpModel(e.target.value)} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={dlpSerialNum} onChange={(e) => setDlpSerialNum(e.target.value)} />
                        </div>
                        <div>
                            <span>허용만료일 : </span>
                            <input type="date" value={validDate} onChange={(e) => setValidDate(e.target.value)} />
                        </div>
                        <div>
                            <span>용량 : </span>
                            <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </div>
                        <div>
                            <span>제조사 : </span>
                            <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                        </div>

                        <div>
                            <span>비고 : </span>
                            <textarea name="" id="" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                    </div> {/**============================ DataRight ============================ */}




                </div> {/** insertData  */}
                <div className='AddExtDevButton'>
                    <button onClick={() => addExtDev()}>등록</button>
                    <button onClick={() => setAddModalWindow(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default AddExtDevModal;