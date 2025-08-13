import axios from 'axios';
import './AddModal.css';
import { useState, useEffect } from 'react';

function AddModal({ setAddModalWindow }) {

    //==[1. esc 입력시, Modal 닫힘 설정 함수] =======================================================================================
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            setAddModalWindow(false);
        }
    };


    //==[2. 모달창 오픈시에 자동으로 Esc 키 이벤트를 감지하도록 설정]=============================================================
    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };

    }, []);

    const [assetId, setAssetId] = useState();
    const [assetType, setAssetType] = useState();
    const [ownsType, setOwnsType] = useState();
    const [empId, setEmpId] = useState();
    const [empName, setEmpName] = useState();
    const [orgName, setOrgName] = useState();
    const [deptName, setDeptName] = useState();
    const [location, setLocation] = useState();
    const [usageType, setUsageType] = useState();
    const [purDate, setPurDate] = useState();
    const [expDate, setExpDate] = useState();
    // const [replDate, setReplDate] = useState();
    const [model, setModel] = useState();
    const [serialNum, setSerialNum] = useState();
    const [cost, setCost] = useState();
    const [ipv4Octet1, setIpv4Octet1] = useState();
    const [ipv4Octet2, setIpv4Octet2] = useState();
    const [ipv4Octet3, setIpv4Octet3] = useState();
    const [ipv4Octet4, setIpv4Octet4] = useState();
    const [notes, setNotes] = useState();

    function cancelModify() {
        setAddModalWindow(false);
    };



    function addAsset() {
        const assetData = {
            assetId: assetId,
            assetType: assetType,
            ownsType: ownsType,
            empId: empId,
            empName: empName,
            orgName: orgName,
            deptName: deptName,
            location: location,
            usageType: usageType,
            purDate: purDate,
            expDate: expDate,
            model: model,
            serialNum: serialNum,
            cost: cost,
            ipv4Octet1: ipv4Octet1,
            ipv4Octet2: ipv4Octet2,
            ipv4Octet3: ipv4Octet3,
            ipv4Octet4: ipv4Octet4,
            notes: notes
        };

        axios
            .post(`/asset/addAsset`, assetData)
            .then(() => {
                alert('추가 성공.');
                setAddModalWindow(false); // 모달 닫기
            })
            .catch((e) => {
                alert(`추가 실패: ${e.message}`);
            });
    }

    return (
        <div className='modifyWindowBackGround'>
            <div className='AddModalContainer'>
                <div className='as1'>
                    <div className='closeModifyModal'>
                        <span onClick={() => setAddModalWindow(false)}>X</span>
                    </div>
                    <div>
                        <span>관리번호 : </span>
                        <input type="text" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>품목 : </span>
                        <select value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                            <option value="데스크탑">데스크탑</option>
                            <option value="노트북">노트북</option>
                            <option value="PDA">PDA</option>
                            <option value="모니터">모니터</option>
                            <option value="USB">USB</option>
                            <option value="외장하드">외장하드</option>
                        </select>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>등급 : </span>
                        <select value={usageType} onChange={(e) => setUsageType(e.target.value)}>
                            <option value="일반">일반</option>
                            <option value="상급">상급</option>
                            <option value="경량">경량</option>
                            <option value="최상급">최상급</option>
                        </select>
                    </div>
                </div>
                <div className='as2'>
                    <span>사용자 : </span>
                    <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} />
                    <span>사번 : </span>
                    <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                    <span>소속 : </span>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                    <span>부서 : </span>
                    <input type="text" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
                </div>

                <div className='as3'>
                    <span>위치 : </span>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>구분 : </span>
                    <select value={ownsType} onChange={(e) => setOwnsType(e.target.value)}>
                        <option value="자산">자산</option>
                        <option value="AJ">AJ</option>
                        <option value="Lotte">Lotte</option>
                    </select>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <span>사용 : </span>
                    <select value={usageType} onChange={(e) => setUsageType(e.target.value)}>
                        <option value="개인">개인</option>
                        <option value="공용">공용</option>
                        <option value="보관">보관</option>
                    </select>
                </div>

                <div className='as4'>
                    <span>구매일 : </span>
                    <input type="date" value={purDate} onChange={(e) => setPurDate(e.target.value)} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>만료일 : </span>
                    <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                </div>

                <div className='as5'>
                    <span>모델 : </span>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>시리얼 : </span>
                    <input type="text" value={serialNum} onChange={(e) => setSerialNum(e.target.value)} />
                </div>
                <div className='as6'>
                    <div>
                        <span>비용 :</span>
                        <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div>
                        <span>IP : </span>
                        <input type="text" value={ipv4Octet1} onChange={(e) => setIpv4Octet1(e.target.value)} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet2} onChange={(e) => setIpv4Octet2(e.target.value)} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet3} onChange={(e) => setIpv4Octet3(e.target.value)} />
                        <span>.</span>
                        <input type="text" value={ipv4Octet4} onChange={(e) => setIpv4Octet4(e.target.value)} />
                    </div>
                </div>
                <div className='as7'>
                    <span>비고 : </span>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <div className='modifyButton'>

                    <button onClick={() => addAsset()}>추가하기</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => setAddModalWindow(false)} >닫기</button>


                </div>
            </div>
        </div>
    );
}

export default AddModal;