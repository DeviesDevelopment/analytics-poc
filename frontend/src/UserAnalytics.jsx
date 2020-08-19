import React, { useEffect, useState } from 'react';

const UserAnalytics = () => {

    const [analytics, setAnalytics] = useState([]);
    useEffect(() => {
        fetch('https://43ct1offkf.execute-api.eu-west-1.amazonaws.com/Prod/analytics')
            .then(response => response.json())
            .then(response => {
                setAnalytics(response);
            });
    }, []);

    return (
        <div>
            <h2>User analytics</h2>
            <p>Number of sessions today: {analytics.length}</p>
        </div>
    );
}

export default UserAnalytics;