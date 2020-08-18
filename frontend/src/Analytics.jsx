import React from 'react';
import { useLocation } from 'react-router-dom';

const iOS = false; // TODO: find out if running on iOS

const Analytics = () => {

    const eventsRef = React.useRef([]);

    const pushEvent = event => {
        eventsRef.current = [
            ...eventsRef.current,
            event,
        ];
    }

    let skip = false;
    const endSession = () => {
        // skip if the function has already been called
        if (skip) {
            return;
        }
        skip = true;

        // TODO: I also add an "end session" event to the data here
        const data = eventsRef.current;
        const url = "TODO: TBD";

        const { vendor } = window.navigator;

        // https://bugs.webkit.org/show_bug.cgi?id=188329
        // Safari bug is fixed but not yet released. When that happens, will need to check safari version also
        if (window.navigator.sendBeacon && !~vendor.indexOf('Apple')) {
            // try to send the beacon
            const beacon = window.navigator.sendBeacon(url, data);
            if (beacon) {
                // if it failed to queue, (some adblockers will block all beacons), then try the other way
                return;
            }
        }

        // Instead, send an async request
        // Except for iOS :(
        const async = !iOS;
        const request = new XMLHttpRequest();
        request.open('POST', url, async); // 'false' makes the request synchronous
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(data);

        // Synchronous request cause a slight delay in UX as the browser waits for the response
        // I've found it more performant to do an async call and use the following hack to keep the loop open while waiting

        // Chrome doesn't care about waiting
        if (!async || ~vendor.indexOf('Google')) {
            return;
        }

        // Latency calculated from navigator.performance
        // TODO: use latency?
        const latency = data.latency || 0;
        const t = Date.now() + Math.max(300, latency + 200);
        while (Date.now() < t) {
            // postpone the JS loop for 300ms so that the request can complete
            // a hack necessary for Firefox and Safari refresh / back button
        }
    }

    React.useEffect(() => {
        window.addEventListener('pagehide', endSession);
        window.addEventListener('beforeunload', endSession);
        window.addEventListener('unload', endSession);
        // for iOS when the focus leaves the tab
        if (iOS) {
            window.addEventListener('blur', endSession);
        }
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
