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
            <h2>Sessions Per Day</h2>
            <p>Here you see the number of sessions per day during the current month:</p>
            <ul>
                {sessionsPerDay(analytics).map(sessions => <li key={sessions.day}>{sessions.day}: {sessions.visits} sessions</li>)}
            </ul>
        </div>
    );
}

const sessionsPerDay = (analytics) => {
    const sessionsPerDay = analytics
        .map(analytic => analytic.sessionEnd)
        .reduce((totals, current) => {
            const day = current.substring(0, 10);
            if (!totals[day]) {
                totals[day] = 0;
            }
            totals[day] = totals[day] + 1
            return totals;
        }, {});

    return Object.keys(sessionsPerDay)
        .map(day => ({
            day,
            visits: sessionsPerDay[day]
        }))
        .sort((a, b) => b.visits - a.visits)
}

export default UserAnalytics;
