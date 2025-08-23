import './ModifyExtDevModal.css';
import './ModalCommon.css';

import axios from 'axios';
import { useState, useEffect } from 'react';

function ModifyExtDevModal({ d, setModifyWindow }) {

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
    const [registeredDlp, setRegisteredDlp] = useState(d.registered_dlp);
    const [controlledDlp, setControlledDlp] = useState(d.controlled_dlp);
    const [empId, setEmpId] = useState(d.emp_id);
    const [empName, setEmpName] = useState(d.emp_name);
    const [deptId, setDeptId] = useState(d.dept_id);
    const [deptName, setDeptName] = useState(d.dept_name);
    const [cmdModel, setCmdModel] = useState(d.cmd_model);
    const [cmdSerialNum, setCmdSerialNum] = useState(d.cmd_serial_num);
    const [dlpModel, setDlpModel] = useState(d.dlp_model);
    const [dlpSerialNum, setDlpSerialNum] = useState(d.dlp_serial_num);
    const [capacity, setCapacity] = useState(d.capacity);
    const [manufacturer, setManufacturer] = useState(d.manufacturer);
    const [usagePurpose, setUsagePurpose] = useState(d.usage_purpose);
    const [location, setLocation] = useState(d.location);
    const [validDate, setValidDate] = useState(d.valid_date);
    const [notes, setNotes] = useState(d.notes);
    const [devStatus, setDevStatus] = useState(d.dev_status);

    const [isModifying, setIsModifying] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);



    // =================[ 외부장치 정보 수정 함수 ]=========================================================================
    function modifyExtDev() {

        // =================[모든 데이터 전송. Refactoring 할 예정.]===============================
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
            validDate: validDate,
            devStatus: devStatus,
            notes: notes
        }

        // =================[ modify Data만 추출하여 전송. Will be Refactoring...coming Soon.......... ]============
        const modifiedData = {};

        if (devId !== d.dev_id) modifiedData.devId = devId;
        if (devType !== d.dev_type) modifiedData.devType = devType;
        if (registeredDlp !== d.registered_dlp) modifiedData.registeredDlp = registeredDlp;
        if (controlledDlp !== d.controlled_dlp) modifiedData.controlledDlp = controlledDlp;
        if (empId !== d.emp_id) modifiedData.empId = empId;
        if (empName !== d.emp_name) modifiedData.empName = empName;
        if (deptId !== d.dept_id) modifiedData.deptId = deptId;
        if (deptName !== d.dept_name) modifiedData.deptName = deptName;
        if (usagePurpose !== d.usage_purpose) modifiedData.usagePurpose = usagePurpose;
        if (location !== d.location) modifiedData.location = location;
        if (validDate !== d.valid_date) modifiedData.validDate = validDate;
        if (devStatus !== d.dev_status) modifiedData.dev_status = devStatus;
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

    console.log(isModifying);

    return (
        <div className='ExtDevModalWindowBackGround'>
            <div className='ExtDevModalContainer'>
                <div className='closeExtDevModalBox' >
                    <button onClick={() => setModifyWindow(false)}>X</button>
                </div>
                <div className='addExtDevTitle'>
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
                            <input type="text" value={devId} onChange={(e) => setDevId(e.target.value)} readOnly={!isModifying} />
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
                                setRegisteredDlp(e.target.value);
                            }}>
                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>DLP통제여부 : </span>
                            <select value={controlledDlp} onChange={(e) => {
                                if (!isModifying) { return }
                                setControlledDlp(e.target.value)
                            }}>

                                <option value='true'>등록</option>
                                <option value='false'>미등록</option>
                            </select>
                        </div>
                        <div>
                            <span>사번 : </span>
                            <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} readOnly={!isModifying} />
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
                            <select value={devStatus} onChange={(e) => {
                                if (!isModifying) { return }
                                setDevStatus(e.target.value)
                                if (e.target.value === 'discarded') {
                                    alert(`폐기 처리합니다. 주의하세요.`);
                                }
                            }}>
                                <option value='using'>사용중</option>
                                <option value='storage'>보관</option>
                                <option value='discarded'>폐기</option>
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
                            <input type="text" value={cmdModel} onChange={(e) => setCmdModel(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={cmdSerialNum} onChange={(e) => setCmdSerialNum(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>모델(DLP) : </span>
                            <input type="text" value={dlpModel} onChange={(e) => setDlpModel(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={dlpSerialNum} onChange={(e) => setDlpSerialNum(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>허용만료일 : </span>
                            <input type="date" value={validDate} onChange={(e) => setValidDate(e.target.value)} readOnly={!isModifying} />
                        </div>
                        <div>
                            <span>용량 : </span>
                            <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} readOnly={!isModifying} />
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
                            <button onClick={() => setIsModifying(false)}>수정취소</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default ModifyExtDevModal;