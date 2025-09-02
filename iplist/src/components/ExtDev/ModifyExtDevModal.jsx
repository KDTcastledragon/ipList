import './ModifyExtDevModal.css';
import './ModalCommon.css';

import axios from 'axios';
import { useState, useEffect } from 'react';

function ModifyExtDevModal({ d, setModifyWindow }) {

    const administratorId = sessionStorage.getItem('adminId');

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape' && isModifying === false) {
            setModifyWindow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);

    // =======================[상태관리 : useState] ============================================================================================
    const [devId, setDevId] = useState(d.dev_id);
    const [devType, setDevType] = useState(d.dev_type);
    const [registeredDlp, setRegisteredDlp] = useState(String(d.registered_dlp)); // type이 꼬이므로, String 변환.
    const [controlledDlp, setControlledDlp] = useState(String(d.controlled_dlp)); // type이 꼬이므로, String 변환. 
    const [devStatus, setDevStatus] = useState(d.dev_status);
    const [empId, setEmpId] = useState(d.emp_id);
    const [empName, setEmpName] = useState(d.emp_name);
    const [deptId, setDeptId] = useState(d.dept_id);
    const [deptName, setDeptName] = useState(d.dept_name);
    const [location, setLocation] = useState(d.location);
    const [validDate, setValidDate] = useState(d.valid_date);
    const [usagePurpose, setUsagePurpose] = useState(d.usage_purpose);
    const [cmdModel, setCmdModel] = useState(d.cmd_model);
    const [cmdSerialNum, setCmdSerialNum] = useState(d.cmd_serial_num);
    const [dlpModel, setDlpModel] = useState(d.dlp_model);
    const [dlpSerialNum, setDlpSerialNum] = useState(d.dlp_serial_num);
    const [capacity, setCapacity] = useState(d.capacity);
    const [manufacturer, setManufacturer] = useState(d.manufacturer);
    const [notes, setNotes] = useState(d.notes);

    const filterAlNum = /^[A-Za-z0-9]*$/;
    const filterNum = /^[0-9]*$/;

    const [isModifying, setIsModifying] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    console.log(`${typeof (d.registered_dlp)} , ${typeof (d.controlled_dlp)}`);
    console.log(`${registeredDlp} , ${controlledDlp}`);
    console.log(`${typeof (registeredDlp)} , ${typeof (controlledDlp)}`);

    // ================================================================================
    function validateValue(event, filter, setFunc, upper = false) {
        let value = event.target.value;

        if (upper) {
            value = value.toUpperCase();
        }

        if (filter.test(value)) {
            setFunc(value);
        } else {
            alert(`목록에 맞는 값을 입력해주세요.`);
        }
    }

    // ======[이전으로 되돌릴시 값도 함께 되돌림 함수.]==========================================
    const backPrevState = () => {
        setIsModifying(false);

        setDevType(d.dev_type);
        setRegisteredDlp(String(d.registered_dlp));
        setControlledDlp(String(d.controlled_dlp));
        setDevStatus(d.dev_status);
        setEmpId(d.emp_id);
        setEmpName(d.emp_name);
        setDeptId(d.dept_id);
        setDeptName(d.dept_name);
        setLocation(d.location);
        setValidDate(d.valid_date);
        setUsagePurpose(d.usage_purpose);
        setCmdModel(d.cmd_model);
        setCmdSerialNum(d.cmd_serial_num);
        setDlpModel(d.dlp_model);
        setDlpSerialNum(d.dlp_serial_num);
        setCapacity(d.capacity);
        setManufacturer(d.manufacturer);
        setNotes(d.notes);
    }


    // =================[ 외부장치 정보 수정 함수 ]=========================================================================
    function modifyExtDev() {
        const isUsing = [empId, empName, deptId, deptName, location].some(Boolean);

        if (isUsing && devStatus !== '사용중') {
            alert(`사용자 존재. [ 보관 ▶ 사용중 ] 변경합니다.`);
            setDevStatus('사용중');
            return;
        }

        // =================[모든 데이터 전송. Refactoring 할 예정.]===============================
        const extDevData = {
            devId: devId,
            devType: devType,
            registeredDlp: registeredDlp === 'true' ? 1 : 0,
            controlledDlp: controlledDlp === 'true' ? 1 : 0,
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
        }

        // =================[ modify Data만 추출하여 전송. Will be Refactoring...coming Soon.......... ]============
        const modifiedData = {};

        if (devType !== d.dev_type) modifiedData.devType = devType;
        if (registeredDlp !== d.registered_dlp) modifiedData.registeredDlp = registeredDlp === 'true' || 1 ? 1 : 0;
        if (controlledDlp !== d.controlled_dlp) modifiedData.controlledDlp = controlledDlp === 'true' || 1 ? 1 : 0;
        if (devStatus !== d.dev_status) modifiedData.devStatus = devStatus;
        if (empId !== d.emp_id) modifiedData.empId = empId;
        if (empName !== d.emp_name) modifiedData.empName = empName;
        if (deptId !== d.dept_id) modifiedData.deptId = deptId;
        if (deptName !== d.dept_name) modifiedData.deptName = deptName;
        if (location !== d.location) modifiedData.location = location;
        if (validDate !== d.valid_date) modifiedData.validDate = validDate;
        if (usagePurpose !== d.usage_purpose) modifiedData.usagePurpose = usagePurpose;
        if (cmdModel !== d.cmd_model) modifiedData.cmdModel = cmdModel;
        if (cmdSerialNum !== d.cmd_serial_num) modifiedData.cmdSerialNum = cmdSerialNum;
        if (dlpModel !== d.dlp_model) modifiedData.dlpModel = dlpModel;
        if (dlpSerialNum !== d.dlp_serial_num) modifiedData.dlpSerialNum = dlpSerialNum;
        if (capacity !== d.capacity) modifiedData.capacity = capacity;
        if (manufacturer !== d.manufacturer) modifiedData.manufacturer = manufacturer;
        if (notes !== d.notes) modifiedData.notes = notes;

        if (Object.keys(modifiedData).length === 0) { // 수정된 내용없을 경우 알림창. (Object의 key만 배열로 반환.)
            alert(`수정한 내용이 없습니다.`);
            return;
        }


        const postConfirm = window.confirm(`수정하시겠습니까? (${d.dev_id} / ${d.dev_type})`);
        if (!postConfirm) { return };

        axios
            .post(`/extDev/modifyExtDev`, extDevData)
            .then(() => {
                alert('수정 성공');
                setModifyWindow(false); // 모달 닫기
                window.location.reload();
            })
            .catch((e) => {
                alert(`등록 실패: ${e.message}`);
            });
    }

    return (
        <div className='ExtDevModalWindowBackGround'>
            <div className='ExtDevModalContainer'>
                <div className='closeExtDevModalBox' >
                    <button onClick={() => setModifyWindow(false)}>X</button>
                </div>
                <div className='extDevModalTitle'>
                    {isModifying === false ?
                        <span>장비 정보</span>
                        :
                        <span>정보 수정 중 . . .</span>
                    }
                </div>
                <div className='insertExtDevData'>
                    <div className={`insertDataLeft ${isModifying === true ? 'modDataLeft' : ''}`}>
                        <div className='devId'>
                            <span>관리번호 : </span>
                            <input type="text" value={devId} readOnly />
                            {/* <input type="text" value={devId} onChange={(e) => setDevId(e.target.value)} readOnly={!isModifying} /> */}
                        </div>
                        <div className='devType'>
                            <span>장비종류 : </span>
                            <select value={devType} onChange={(e) => {
                                if (!isModifying) { return }
                                setDevType(e.target.value);
                            }}>
                                <option value="USB">USB</option>
                                <option value="카드리더기">카드리더기</option>
                                <option value="외장하드">외장하드</option>
                            </select>
                        </div>

                        <div>
                            <span>DLP등록여부 : </span>
                            <select value={registeredDlp} onChange={(e) => {
                                if (!isModifying) { return }

                                const newData = e.target.value;

                                if (controlledDlp === 'true' && newData === 'false') {
                                    alert(`DLP통제여부 '미등록' 자동변경.`);
                                    setControlledDlp('false');
                                }
                                setRegisteredDlp(newData);

                            }}>
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>DLP통제여부 : </span>
                            <select value={controlledDlp} onChange={(e) => {
                                if (!isModifying) { return }
                                else if (registeredDlp === 'false' && e.target.value === 'true') {
                                    alert(`DLP등록 후 가능합니다.(현재 미등록 상태)`);
                                    return;
                                } else {
                                    setControlledDlp(e.target.value)
                                }
                            }}>

                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>사번 : </span>
                            <input type="text" minLength={8} maxLength={8} value={empId} onChange={(e) => validateValue(e, filterNum, setEmpId)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>사용자 : </span>
                            <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>부서 : </span>
                            <input type="text" value={deptName} onChange={(e) => setDeptName(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>위치 : </span>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>사용상태 : </span>
                            <select value={devStatus} disabled={!isModifying} onChange={(e) => {
                                if (!isModifying) {
                                    return
                                };
                                if (e.target.value === '폐기') {
                                    alert(`폐기 처리합니다. 주의하세요.`);
                                    setDevStatus(e.target.value);
                                } else {
                                    setDevStatus(e.target.value);
                                }
                            }}>
                                <option value='사용중'>사용중</option>
                                <option value='보관'>보관</option>
                                <option value='폐기'>폐기</option>
                            </select>
                        </div>
                        <div>
                            <span>사용 목적 : </span>
                            <textarea name="" id="" value={usagePurpose} onChange={(e) => setUsagePurpose(e.target.value)} readOnly={!isModifying}></textarea>
                        </div>
                    </div> {/**============================= DataLeft=====================================  */}

                    <div className={`insertDataRight ${isModifying === true ? 'modDataRight' : ''}`}>
                        <div>
                            <span>모델(CMD) : </span>
                            <input type="text" value={cmdModel} onChange={(e) => validateValue(e, filterAlNum, setCmdModel)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={cmdSerialNum} onChange={(e) => validateValue(e, filterAlNum, setCmdSerialNum)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>모델(DLP) : </span>
                            <input type="text" value={dlpModel} onChange={(e) => validateValue(e, filterAlNum, setDlpModel)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>시리얼(DLP) : </span>
                            <input type="text" value={dlpSerialNum} onChange={(e) => validateValue(e, filterAlNum, setDlpSerialNum)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>허용만료일 : </span>
                            <input type="date" value={validDate} onChange={(e) => setValidDate(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>용량 : </span>
                            <input type="text" value={capacity} onChange={(e) => validateValue(e, filterNum, setCapacity)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>제조사 : </span>
                            <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} readOnly={!isModifying} />
                        </div>

                        <div>
                            <span>비고 : </span>
                            <textarea name="" id="" value={notes} onChange={(e) => setNotes(e.target.value)} readOnly={!isModifying}></textarea>
                        </div>
                    </div> {/**============================ DataRight ============================ */}

                </div> {/** insertData  */}
                <div className='modalExtDevButton'>
                    {isModifying === false ?
                        <div className='isModifyingFalse'>
                            <button onClick={() => setIsModifying(true)}>수정하기</button>
                            <button onClick={() => setModifyWindow(false)}>닫기</button>
                        </div>
                        :
                        <div className='isModifyingTrue'>
                            <button onClick={() => modifyExtDev()}>수정완료</button>
                            <button onClick={() => backPrevState()}>이전으로</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default ModifyExtDevModal;