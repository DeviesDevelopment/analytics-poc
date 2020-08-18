import React from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {

    const location = useLocation();
    React.useEffect(() => {
        console.log('Location changed', location.pathname);
    }, [location]);

    return null;
}

export default Analytics;
