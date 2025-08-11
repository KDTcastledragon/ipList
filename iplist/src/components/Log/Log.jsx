import './Log.css';

import { useEffect, useState } from 'react';
import axios from 'axios';


function Log() {
    const [empData, setEmpData] = useState([]);

    function allEmp() {
        axios
            .get(`/test/allEmp`)
            .then((r) => {
                console.log(`allEmp성공`);
                setEmpData(r.data);
            }).catch((e) => {
                console.log(`failed`);
                alert(`failed`);
            })
    }

    return (
        <>
            <h1>LOg</h1>
            <div><button onClick={() => allEmp()}>사원목록 출력해보기</button></div>

            <table>
                <thead>
                    <tr>id</tr>
                    <tr>name</tr>
                    <tr>name</tr>
                    <tr>name</tr>
                    <tr>name</tr>
                    <tr>name</tr>
                    <tr>name</tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        </>
    );
}

export default Log;