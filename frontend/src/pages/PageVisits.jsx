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
            <h2>Page Visits</h2>

            <p>The information available here can be used to find out which pages your users like and/or are easy to find.</p>

            <p>Most visited pages:</p>
            <ul>
                {mostVisitedPage(analytics).map(page => <li key={page.path}>{page.path}: {page.visits}</li>)}
            </ul>
        </div>
    );
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
