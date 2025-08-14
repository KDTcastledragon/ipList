import './IPList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function IPList() {
    const [assetsData, setAssetsData] = useState([]);
    const [enteredWord, setEnteredWord] = useState('');

    function searchWord() {
        axios
            .get(`/asset/searchWord=${enteredWord}`)
            .then((r) => {
                setAssetsData(r.data);
            }).catch((e) => {
                alert(`실패.`);
            })
    }

    useEffect(() => {
        axios
            .get(`/asset/allAssets`)
            .then((r) => {
                // alert(`IPLIst`);
                setAssetsData(r.data);
            }).catch((e) => {
                alert(`${e.message}`);
            })
    }, [])

    // const users = Array.from({ length: 250 }, (_, i) => `사용자${i + 1}`);

    return (
        <div className='container'>
            <div>
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => searchWord(enteredWord)}>검색</button></div>
            <div className='da'>
                <button>90</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button>100</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button>110</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className='userGrid'>
                {/* {users.map((user, index) => (
                    <div key={index} className='userItem'>
                        <span>{index + 1}</span>
                        <span>{user}</span>
                    </div>
                ))} */}
                {assetsData && assetsData.length > 0 ? (
                    assetsData.map((d, i) => (
                        <div className='userItem' key={i}>
                            <div>{d.ipv4_octet4}</div>
                            <div>{d.emp_name}</div>
                        </div>
                    ))
                )
                    :
                    <div>Error</div>
                }
            </div>
        </div>
    );
}

export default IPList;