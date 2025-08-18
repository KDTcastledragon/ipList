import axios from 'axios';
import './ModifyExtDevModal.css';
import { useState, useEffect } from 'react';

function ModifyExtDevModal({ d, setModifyWindow }) {

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            setModifyWindow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);


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

    function cancelAddExtDev() {
        setModifyWindow(false);
    }

    function modifyExtDev() {
        const extDevData = {
            devId: devId,
            registeredDlp: registeredDlp,
            controlledDlp: controlledDlp,
            empId: empId,
            empName: empName,
            deptId: deptId,
            deptName: deptName,
            usagePurpose: usagePurpose,
            location: location,
            validDate: validDate,
            notes: notes
        };

        axios
            .post(`/extDev/modifyExtDev`, extDevData)
            .then(() => {
                alert('수정 성공');
                setModifyWindow(false); // 모달 닫기
            })
            .catch((e) => {
                alert(`등록 실패: ${e.message}`);
            });
    }

    return (
        <div className='modifyWindowBackGround'>
            <div className='AddExtDevModalContainer'>
                <div className='closeModifyModalBox' >
                    <button onClick={() => setModifyWindow(false)}>X</button>
                </div>
                <div className='addExtDevTitle'><span>외부장비 수정</span></div>
                <div className='insertExtDevData'>
                    <div className='insertDataLeft'>
                        <div className='devId'>
                            <span>관리번호 : </span>
                            <input type="text" value={devId} onChange={(e) => setDevId(e.target.value)} />
                        </div>
                        <div className='devType'>
                            <span>장비종류 : </span>
                            <input type="text" value={devType} onChange={(e) => setDevType(e.target.value)} readOnly />
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
                            <input type="text" value={cmdModel} onChange={(e) => setCmdModel(e.target.value)} readOnly />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={cmdSerialNum} onChange={(e) => setCmdSerialNum(e.target.value)} readOnly />
                        </div>
                        <div>
                            <span>모델(DLP) : </span>
                            <input type="text" value={dlpModel} onChange={(e) => setDlpModel(e.target.value)} readOnly />
                        </div>
                        <div>
                            <span>시리얼(CMD) : </span>
                            <input type="text" value={dlpSerialNum} onChange={(e) => setDlpSerialNum(e.target.value)} readOnly />
                        </div>
                        <div>
                            <span>허용만료일 : </span>
                            <input type="date" value={validDate} onChange={(e) => setValidDate(e.target.value)} />
                        </div>
                        <div>
                            <span>용량 : </span>
                            <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} readOnly />
                        </div>
                        <div>
                            <span>제조사 : </span>
                            <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} readOnly />
                        </div>

                        <div>
                            <span>비고 : </span>
                            <textarea name="" id="" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                    </div> {/**============================ DataRight ============================ */}




                </div> {/** insertData  */}
                <div className='modifyExtDevButton'>
                    <button onClick={() => modifyExtDev()}>수정</button>
                    <button onClick={() => setModifyWindow(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default ModifyExtDevModal;