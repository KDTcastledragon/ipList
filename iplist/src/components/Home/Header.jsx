import './Header.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const currentMenu = sessionStorage.getItem('page');
    const [menu, setMenu] = useState();
    const nav = useNavigate();
    const adminName = sessionStorage.getItem('adminName');

    useEffect(() => {
        setMenu(currentMenu);
    }, [currentMenu]);


    function selectPage(menu, page) {
        sessionStorage.setItem('page', menu);
        setMenu(menu);
        nav(page);
    }

    function mainPage() {
        sessionStorage.setItem('page', 'ExtDev');
        nav('/ExtDev');
    }

    function logout() {
        sessionStorage.clear();
        nav('/PagePather');
        window.location.reload();
    }

    return (
        <div className='Header'>
            <div className='header1'>
                <div className='headerTitle'><span onClick={() => mainPage()}>자산관리</span></div>
                <div className='loginedAdmin'>
                    <span>{adminName}</span>
                    <button onClick={() => logout()}>로그아웃</button>
                </div>
            </div>
            <div className='headerMenuButton'>
                <div className={`${menu === 'ExtDev' ? 'selectedMenu' : 'menuDiv'}`}><button onClick={() => selectPage('ExtDev', '/ExtDev')}>외부장비</button></div>
                <div className={`${menu === 'Log' ? 'selectedMenu' : 'menuDiv'}`}><button onClick={() => selectPage('Log', '/Log')}>로그</button></div>
                {/* <div><button onClick={() => selectPage('Assets', '/Assets')}>자산</button></div> */}
                {/* <div><button onClick={() => selectPage('IPList', '/IPList')}>IP목록</button></div> */}
                {/* <div><button onClick={() => selectPage('UnauthSW', '/UnauthSW')}>미인가</button></div> */}
            </div>




        </div>
    );
}

export default Header;