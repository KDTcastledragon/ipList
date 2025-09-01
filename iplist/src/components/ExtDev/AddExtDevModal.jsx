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

    // useEffect(() => {
    //     window.addEventListener('keydown', handleEscKey);

    //     return () => {
    //         window.removeEventListener('keydown', handleEscKey);
    //     };

    // }, []);

    const [devId, setDevId] = useState('');
    const [devType, setDevType] = useState('USB');
    const [registeredDlp, setRegisteredDlp] = useState('false');
    const [controlledDlp, setControlledDlp] = useState('false');
    const [empId, setEmpId] = useState();
    const [empName, setEmpName] = useState();
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
    const [validDate, setValidDate] = useState();
    const [notes, setNotes] = useState();
    const [devStatus, setDevStatus] = useState('보관');
    const administratorId = sessionStorage.getItem('adminId');

    const filterAlNum = /^[A-Za-z0-9]*$/;
    const filterNum = /^[0-9]*$/;
    // ==============================================================================================
    function validateValue(event, filter, setFunc, upper = false) {
        let value = event.target.value;

        if (upper) {
            value = value.toUpperCase();
        }

        if (filter.test(value)) {
            setFunc(value);
        } else {
            alert(`목록에 맞는 값을 입력해주세요.`);
            setFunc(null);
            return;
        }
    }


    // ==============================================================================================
    function addExtDev() {
        if (!devId) {
            alert(`관리번호는 반드시 입력해야합니다.`);
            return;
        }
        const isUsing = [empId, empName, deptId, deptName, location].some(Boolean);

        if (isUsing && devStatus !== '사용중') {
            alert(`사용자 존재. [ 보관 ▶ 사용중 ] 변경합니다.`);
            setDevStatus('사용중');
            return;
        }

        const extDevData = {
            devId: devId,
            devType: devType,
            registeredDlp: registeredDlp === 'true' || 1 ? 1 : 0,
            controlledDlp: controlledDlp === 'true' || 1 ? 1 : 0,
            devStatus: devStatus,
            empId: empId,
            empName: empName,
            deptId: deptId,
            deptName: deptName,
            location: location,
            validDate: validDate,
            usagePurpose: usagePurpose,
            cmdModel: cmdModel,
            cmdSerialNum: cmdSerialNum,
            dlpModel: dlpModel,
            dlpSerialNum: dlpSerialNum,
            capacity: capacity === '' ? null : capacity,
            manufacturer: manufacturer,
            notes: notes,
            adminId: administratorId
        };

        axios
            .post(`/extDev/addExtDev`, extDevData)
            .then(() => {
                alert('외부저장장치 등록 성공');
                window.location.reload();
                setAddModalWindow(false); // 모달 닫기
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
                <div className='extDevModalTitle'><span>신규장비 등록</span></div>
                <div className='insertExtDevData'>
                    <div className='insertDataLeft'>
                        <div className='devId'>
                            <span>관리번호 : </span>
                            <input type="text" value={devId} onChange={(e) => validateValue(e, filterAlNum, setDevId, true)} />
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
                            <select value={registeredDlp} onChange={(e) => {
                                if (e.target.value === 'false' && controlledDlp === 'true') {
                                    alert(`DLP통제여부 '미등록' 변경.`);
                                    setControlledDlp('false');
                                }
                                setRegisteredDlp(e.target.value);
                            }}>
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>DLP통제여부 : </span>
                            <select value={controlledDlp} onChange={(e) => {
                                if (registeredDlp === 'false' && e.target.value === 'true') {
                                    alert(`DLP등록 후 가능합니다.(현재 미등록 상태)`);
                                    return;
                                }
                                setControlledDlp(e.target.value);
                            }

                            }
                            >
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>사번 : </span>
                            <input type="text" minLength={8} maxLength={8} value={empId} onChange={(e) => validateValue(e, filterNum, setEmpId)} />
                        </div>
                        <div>
                            <span>사용자 : </span>
                            <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} />
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
                            <span>사용상태 : </span>
                            <select value={devStatus} onChange={(e) => {
                                setDevStatus(e.target.value)
                            }}>
                                <option value='사용중'>사용중</option>
                                <option value='보관'>보관</option>
                            </select>
                        </div>
                        <div>
                            <span>사용 목적 : </span>
                            <textarea name="" id="" value={usagePurpose} onChange={(e) => setUsagePurpose(e.target.value)}></textarea>
                        </div>
                    </div> {/**============================= DataLeft=====================================  */}

                    <div className='insertDataRight'>
                        <div>
                            <span>모델(CMD) : </span>
                            <input type="text" value={cmdModel} onChange={(e) => validateValue(e, filterAlNum, setCmdModel)} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={cmdSerialNum} onChange={(e) => validateValue(e, filterAlNum, setCmdSerialNum)} />
                        </div>
                        <div>
                            <span>모델(DLP) : </span>
                            <input type="text" value={dlpModel} onChange={(e) => validateValue(e, filterAlNum, setDlpModel)} />
                        </div>
                        <div>
                            <span>시리얼(DLP) : </span>
                            <input type="text" value={dlpSerialNum} onChange={(e) => validateValue(e, filterAlNum, setDlpSerialNum)} />
                        </div>
                        <div>
                            <span>허용만료일 : </span>
                            <input type="date" value={validDate} onChange={(e) => setValidDate(e.target.value)} />
                        </div>
                        <div>
                            <span>용량 : </span>
                            <input type="text" value={capacity} onChange={(e) => validateValue(e, filterNum, setCapacity)} />
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