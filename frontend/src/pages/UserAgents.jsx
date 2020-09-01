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
            <h2>User agents</h2>
            <p>These are the User-Agent headers sent by our clients. The data here can be used to find out which devices and browsers that are commonly used to view our site.</p>
            <p>User agents seen this month:</p>
            <ul>
                {usedBrowsers(analytics).map(userAgent => <li key={userAgent.browser}>{userAgent.browser}: {userAgent.visits} times</li>)}
            </ul>
        </div>
    );
}

const usedBrowsers = (analytics) => {
    const browsers = analytics
        .map(analytic => analytic.browser)
        .reduce((totals, current) => {
            if (!totals[current]) {
                totals[current] = 0;
            }
            totals[current] = totals[current] + 1
            return totals;
        }, {});

    return Object.keys(browsers)
        .map(browser => ({
            browser,
            visits: browsers[browser]
        }))
        .sort((a, b) => b.visits - a.visits)
}

export default UserAnalytics;
