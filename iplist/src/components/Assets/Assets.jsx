import './Assets.css';
import { useEffect, useState } from 'react';


function Assets() {
    const [enteredWord, setEnteredWord] = useState('');

    function searchDB(word) {
        alert(`${word}`);
    }

    return (
        <div className='Container'>

            <div>
                <input type="text" onChange={(e) => setEnteredWord(e.target.value)} value={enteredWord} />
                <button onClick={() => searchDB(enteredWord)}>검색</button>
                {/* 관리번호, 사번,사용자,품목, 소속,부서,위치,구분,등급,비용,비고,사용현황,모델,시리얼,ip,관리자노트 */}
            </div>
            <table className='oaTable'>
                <thead>
                    <tr>
                        <th>관리번호</th>
                        <th>품목</th>
                        <th>등급</th>
                        <th>사용자</th>
                        <th>사원번호</th>
                        <th>소속</th>
                        <th>부서</th>
                        <th>위치</th>
                        <th>IP주소</th>
                        <th>구매일</th>
                        <th>만료일</th>
                        <th>구분</th>
                        <th>비용</th>
                        <th>사용현황</th>
                        <th>모델</th>
                        <th>시리얼</th>
                        <th>교체일</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>72203134</td>
                        <td>노트북</td>
                        <td>상급</td>
                        <td>이성룡</td>
                        <td>22510231</td>
                        <td>서울</td>
                        <td>IT팀</td>
                        <td>서울 9F</td>
                        <td>192.168.110.93</td>
                        <td>2025-03-31</td>
                        <td>2025-10-04</td>
                        <td>lotte</td>
                        <td>31000</td>
                        <td>개인</td>
                        <td>thin 15B V13E</td>
                        <td>L38103A23432</td>
                        <td>2025-03-31</td>
                        <td>비고</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => alert(`수정버튼`)}>수정버튼</button>
        </div>
    );
}

export default Assets;