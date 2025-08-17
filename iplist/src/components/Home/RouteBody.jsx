import { Routes, Route } from 'react-router-dom';

import Assets from '../Assets/Assets';
import IPList from '../IPList/IPList';
import ExtDev from '../ExtDev/ExtDev';
import Log from '../Log/Log';
import UnauthSW from '../UnauthSW/UnauthSW';

function RouteBody() {

    return (
        <>
            <Routes>
                <Route path='Assets' element={<Assets />} />
                <Route path='IPList' element={<IPList />} />
                <Route path='ExtDev' element={<ExtDev />} />
                <Route path='Log' element={<Log />} />
                <Route path='UnauthSW' element={<UnauthSW />} />
            </Routes>
        </>
    );
}

export default RouteBody;