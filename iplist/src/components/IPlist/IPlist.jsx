import './IPlist.css';
import { useEffect, useState } from 'react';


function IPlist() {

    return (
        <>
            <h1>IP 목록 관리</h1>
            <div>
                <span>관리번호 : </span>
                <span>1220A237</span>
            </div>
            <div>
                <span>분류</span>
                <hr />
                <select name="d" id="">
                    <option value="deskTop">데스크탑</option>
                    <option value="noteBook">노트북</option>
                    <option value="workStation">WORKSTATION</option>
                    <option value="PDA">PDA</option>
                </select>
            </div>
            <div>사번 : <span>12345678</span></div>
            <div>이름 : <span>이성룡</span></div>
            <div>직급 : <span>인턴</span></div>
            <div>소속 : <span>IT팀</span></div>
            <div>IP :
                <input type="text" value={"192.168.456.866"} readOnly />
            </div>
            <button onClick={() => alert(`수정버튼`)}>수정버튼</button>
        </>
    );
}

export default IPlist;