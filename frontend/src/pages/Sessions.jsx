import React, { useEffect, useState } from 'react';

const UserAnalytics = () => {

    const [analytics, setAnalytics] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/analytics')
            .then(response => response.json())
            .then(response => {
                setAnalytics(response);
            });
    }, []);

    return (
        <div>
            <h2>Sessions</h2>
            <p>Number of sessions this month: {analytics.length}</p>
            <p>Average initial load time: {averageLoadTime(analytics)} ms</p>
        </div>
    );
}

const averageLoadTime = (analytics) => {
    if (analytics.length === 0) {
        return 0;
    }
    const total = analytics
        .map(analytic => analytic.pageLoad)
        .reduce((total, current) => {
            return total + current;
        }, 0);
    return (total / analytics.length).toFixed(2);
}

export default UserAnalytics;