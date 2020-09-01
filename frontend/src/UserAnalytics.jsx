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
            <h2>User analytics</h2>
            <p>Number of sessions today: {analytics.length}</p>
            <p>Average initial load time: {averageLoadTime(analytics)} ms</p>
            <p>User agents:
                <ul>
                    {usedBrowsers(analytics).map(browser => <li>{browser}</li>)}
                </ul>
            </p>
            <p>Page visits:
                <ul>
                    {mostVisitedPage(analytics).map(page => <li>{page.path}: {page.visits}</li>)}
                </ul>
            </p>
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

const usedBrowsers = (analytics) => {
    const browsers = analytics
        .map(analytic => analytic.browser)
    return [...new Set(browsers)];

}

const mostVisitedPage = (analytics) => {
    const events = analytics
        .flatMap(analytic => analytic.events)
        .map(event => event.pathname)
        .reduce((totals, currentPath) => {
            if (!totals[currentPath]) {
                totals[currentPath] = 0;
            }
            totals[currentPath] = totals[currentPath] + 1
            return totals;
        }, {});
    return Object.keys(events)
        .map(path => ({
            path,
            visits: events[path]
        }))
        .sort((a, b) => b.visits - a.visits)
}

export default UserAnalytics;