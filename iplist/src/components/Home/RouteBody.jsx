import { Routes, Route } from 'react-router-dom';

import Assets from '../Assets/Assets';
import Log from '../Log/Log';
import USB from '../USB/USB';
import IPList from '../IPList/IPList';
import UnauthSW from '../UnauthSW/UnauthSW';

function RouteBody() {

    return (
        <>
            <Routes>
                <Route path='Assets' element={<Assets />} />
                <Route path='IPList' element={<IPList />} />
                <Route path='Log' element={<Log />} />
                <Route path='USB' element={<USB />} />
                <Route path='UnauthSW' element={<UnauthSW />} />
            </Routes>
        </>
    );
}

export default RouteBody;