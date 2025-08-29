import './MainHome.css';

import Header from './Header';
import RouteBody from './RouteBody';

function MainHome() {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='RouteBodyContainer'>
                <RouteBody />
            </div>
        </>
    )
}

export default MainHome;