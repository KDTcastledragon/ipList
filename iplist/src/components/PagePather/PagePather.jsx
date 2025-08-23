import './PagePather.css';

import Header from '../Home/Header';
import RouteBody from '../Home/RouteBody';
import LogIn from '../LogIn/LogIn';

function PagePather() {
    const adminCode = sessionStorage.getItem('adminCode');

    return (
        <>
            {adminCode === 'admin' ?
                <>
                    <Header></Header>
                    <RouteBody></RouteBody>
                </>
                :
                <>
                    <LogIn></LogIn>
                </>
            }
        </>

    )
}

export default PagePather;