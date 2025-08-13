import axios from 'axios';
import './ModifyModal.css';
import { useState, useEffect } from 'react';

function ModifyModal({ d, setModifyWindow }) {
    const [originalData] = useState({ ...d });
    const [isModifying, setIsModifying] = useState(false);

    const [assetId, setAssetId] = useState(d.asset_id);
    const [empId, setEmpId] = useState(d.emp_id);
    const [empName, setEmpName] = useState(d.emp_name);
    const [location, setLocation] = useState(d.location);
    const [usageType, setUsageType] = useState(d.usage_type);
    const [replDate, setReplDate] = useState(d.repl_date);
    const [model, setModel] = useState(d.model);
    const [serialNum, setSerialNum] = useState(d.serial_num);
    const [cost, setCost] = useState(d.cost);
    const [ipv4Octet1, setIpv4Octet1] = useState(d.ipv4_octet1);
    const [ipv4Octet2, setIpv4Octet2] = useState(d.ipv4_octet2);
    const [ipv4Octet3, setIpv4Octet3] = useState(d.ipv4_octet3);
    const [ipv4Octet4, setIpv4Octet4] = useState(d.ipv4_octet4);
    const [notes, setNotes] = useState(d.notes);

    function cancelModify() {
        setAssetId(originalData.asset_id);
        setEmpId(originalData.emp_id);
        setEmpName(originalData.emp_name);
        setLocation(originalData.location);
        setUsageType(originalData.usage_type);
        setReplDate(originalData.repl_date);
        setModel(originalData.model);
        setSerialNum(originalData.serial_num);
        setCost(originalData.cost);
        setIpv4Octet1(originalData.ipv4_octet1);
        setIpv4Octet2(originalData.ipv4_octet2);
        setIpv4Octet3(originalData.ipv4_octet3);
        setIpv4Octet4(originalData.ipv4_octet4);
        setNotes(originalData.notes);

        setIsModifying(false);
    };


    function modifyAsset() {
        axios
            .post(`//modifyAsset`)
            .then(() => {
                alert(`변경되었습니다.`);
            }).catch((e) => {
                alert(`실패`);
            })
    }

    return (
        <div className='modifyWindowBackGround'>
            <div className='ModifyModalContainer'>
                <div className='as1'>
                    <div className='ownsType'>
                        <span>{d.owns_type}</span>
                    </div>
                    <div className='closeModifyModal'>
                        <span onClick={() => setModifyWindow(false)}>X</span>
                    </div>
                    <div>
                        <span>관리번호 : </span>
                        <input type="text" value={assetId} onChange={(e) => setAssetId(e.target.value)} readOnly={!isModifying} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{d.asset_type}</span>
                        <span> - </span>
                        <span>{d.grade}</span>
                    </div>
                </div>
                <div className='as2'>
                    <span>사용자 : </span>
                    <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} readOnly={!isModifying} />
                    <span> / </span>
                    <span>{empId} - </span>
                    <span>{d.org_name} - </span>
                    <span>{d.dept_name}팀</span>
                </div>
                <div className='as3'>
                    <span>위치 : </span>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} readOnly={!isModifying} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>사용구분 : </span>
                    <input type="text" value={usageType} onChange={(e) => setUsageType(e.target.value)} readOnly={!isModifying} />
                </div>
                <div className='as4'>
                    <span>사용기간 : </span>
                    <span>{d.pur_date} ~ </span>
                    <span>{d.exp_date}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>교체일 :</span>
                    <input type="date" value={d.repl_date === d.pur_date ? null : replDate} readOnly={!isModifying} />
                </div>

                <div className='as5'>
                    <span>모델 : </span>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} readOnly={!isModifying} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>시리얼 : </span>
                    <input type="text" value={serialNum} onChange={(e) => setSerialNum(e.target.value)} readOnly={!isModifying} />
                </div>
                <div className='as6'>
                    <div>
                        <span>비용 :</span>
                        <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} readOnly={!isModifying} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div>
                        <span>IP : </span>
                        <input type="text" value={ipv4Octet1} onChange={(e) => setIpv4Octet1(e.target.value)} readOnly={!isModifying} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet2} onChange={(e) => setIpv4Octet2(e.target.value)} readOnly={!isModifying} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet3} onChange={(e) => setIpv4Octet3(e.target.value)} readOnly={!isModifying} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet4} onChange={(e) => setIpv4Octet4(e.target.value)} readOnly={!isModifying} />
                    </div>
                </div>
                <div className='as7'>
                    <span>비고 : </span>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} readOnly={!isModifying} />
                </div>

                <div className='modifyButton'>
                    {isModifying === false ?
                        <>
                            <button onClick={() => setIsModifying(true)}>변경</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => setModifyWindow(false)} >닫기</button>
                        </>
                        :
                        <>
                            <button onClick={() => modifyAsset()}>변경하기</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => cancelModify()}>변경취소</button>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}

export default ModifyModal;