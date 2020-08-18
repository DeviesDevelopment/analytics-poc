import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {

    const [events, setEvents] = useState([]);

    const location = useLocation();
    React.useEffect(() => {
        setEvents(events => ([
            ...events,
            {
                pathname: location.pathname
            }
        ]));
        console.log('Location changed', location.pathname);
    }, [location]);

    return null;
}

export default Analytics;
