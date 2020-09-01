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
            <h2>Time Spent Per Page</h2>

            <p>Average time spent per page this month:</p>
            <ul>
                {timeSpentPerPage(analytics).map(page => <li key={page.path}>{page.path}: {page.duration}</li>)}
            </ul>
        </div>
    );
}

const timeSpentPerPage = (analytics) => {
    const pageVisits = analytics
        .flatMap(analytic => analytic.events)
        .map(event => event.pathname)
        .reduce((totals, currentPath) => {
            if (!totals[currentPath]) {
                totals[currentPath] = 0;
            }
            totals[currentPath] = totals[currentPath] + 1
            return totals;
        }, {});

    const totalTimes = analytics
        .flatMap(analytic => analytic.events)
        .reduce((totals, currentEvent) => {
            const path = currentEvent.pathname;
            if (!totals[path]) {
                totals[path] = 0;
            }
            totals[path] = totals[path] + currentEvent.duration;
            return totals;
        }, {});
    console.log(totalTimes)
    return Object.keys(totalTimes)
        .map(path => ({
            path,
            duration: totalTimes[path] / pageVisits[path]
        }))
        .sort((a, b) => b.duration - a.duration)
        .map(obj => {
            console.log(obj)
            if (obj.duration > 1000) {
                return {
                    path: obj.path,
                    duration: (obj.duration / 1000).toFixed(2) + " seconds"
                };
            }
            return {
                path: obj.path,
                duration: obj.duration.toFixed(2) + " milliseconds"
            };
        });
}

export default UserAnalytics;
