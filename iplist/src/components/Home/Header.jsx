import './Header.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const currentPage = sessionStorage.getItem('page');
    const [menu, setMenu] = useState();
    const nav = useNavigate();

    useEffect(() => {
        setMenu(currentPage);
    }, [currentPage])


    function selectPage(menu, page) {
        sessionStorage.setItem('page', menu);
        setMenu(menu);
        nav(page);
    }

    return (
        <div className='Header'>
            <div><button onClick={() => selectPage('Assets', '/Assets')}>자산</button></div>
            <div><button onClick={() => selectPage('IPList', '/IPList')}>IP목록</button></div>
            <div><button onClick={() => selectPage('USB', '/USB')}>USB</button></div>
            <div><button onClick={() => selectPage('Log', '/Log')}>로그</button></div>
            <div><button onClick={() => selectPage('UnauthSW', '/UnauthSW')}>미인가</button></div>
            <div><button onClick={() => selectPage('', '/Str')}>조직도</button></div>
            <div><button onClick={() => selectPage('', '/Add')}>추가</button></div>
        </div>
    );
}

export default Header;