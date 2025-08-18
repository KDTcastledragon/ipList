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
            <div>

            </div>
        </>
    );
}

export default Log;