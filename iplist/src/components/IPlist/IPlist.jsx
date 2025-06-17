import './IPlist.css';
import { useEffect, useState } from 'react';


function IPlist() {
    const [enteredWord,setEnteredWord] = useState('');

    function searchDB(word) {
        alert(`${word}`);
    }

    return (
        <>
            <div>
        <div><span>자산관리</span></div>
        <div><span>IP목록</span></div>
        <div><span>로그</span></div>
        <div><span>USB</span></div>
            </div>
            <div>
                <input type="text" onChange={(e)=>setEnteredWord(e.target.value)} value={enteredWord}/>
                <button onClick={()=>searchDB(enteredWord)}>검색</button>
                {/* 관리번호, 사번,사용자,품목, 소속,부서,위치,구분,등급,비용,비고,사용현황,모델,시리얼,ip,관리자노트 */}
            </div>
            <table className='OATable'>
                <thead>
                    <th>
                        <td>관리번호</td>
                        <td>품목</td>
                        <td>사용자</td>
                        <td>소속</td>
                        <td>부서</td>
                        <td>위치</td>
                        <td>구매일</td>
                        <td>만료일</td>
                        <td>교체일</td>
                        <td>등급</td>
                        <td>비용</td>
                        <td>사원번호</td>
                        <td>구분</td>
                        <td>사용현황</td>
                        <td>모델</td>
                        <td>시리얼</td>
                        <td>IP주소</td>
                        <td>비고</td>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td>관리번호</td>
                        <td>품목</td>
                        <td>사용자</td>
                        <td>소속</td>
                        <td>부서</td>
                        <td>위치</td>
                        <td>구매일</td>
                        <td>만료일</td>
                        <td>교체일</td>
                        <td>등급</td>
                        <td>비용</td>
                        <td>사원번호</td>
                        <td>구분</td>
                        <td>사용현황</td>
                        <td>모델</td>
                        <td>시리얼</td>
                        <td>IP주소</td>
                        <td>비고</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => alert(`수정버튼`)}>수정버튼</button>
        </>
    );
}

export default IPlist;