import React from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {

    const eventsRef = React.useRef([]);

    const pushEvent = event => {
        eventsRef.current = [
            ...eventsRef.current,
            event,
        ];
    }

    let skip;
    const endSession = () => {
        if (skip) return
        skip = true
        console.log(eventsRef.current);
        debugger;
    }

    React.useEffect(() => {
        window.addEventListener('pagehide', endSession);
        window.addEventListener('beforeunload', endSession)
        window.addEventListener('unload', endSession)
    }, []);

    const location = useLocation();
    React.useEffect(() => {
        pushEvent({
            pathname: location.pathname
        });
        console.log('Location changed', location.pathname);
    }, [location]);

    return null;
}

export default Analytics;
