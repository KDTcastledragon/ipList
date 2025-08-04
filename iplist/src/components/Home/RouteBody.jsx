import './RouteBody.css';
import { Routes, Route } from 'react-router-dom';

import Assets from '../Assets/Assets';
import Log from '../Log/Log';
import USB from '../USB/USB';

function RouteBody() {

    return (
        <>
            <Routes>
                <Route path='Assets' element={<Assets />} />
                <Route path='Log' element={<Log />} />
                <Route path='USB' element={<USB />} />
            </Routes>
        </>
    );
}

export default RouteBody;