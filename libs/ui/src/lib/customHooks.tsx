"use client"
import React, { useEffect, useState } from 'react';


// get window height and weight
function getWindowDimensions() {
    if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    return {
        width: 0,
        height: 0,
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

// countDownDate
export function useCountDown(countDownDate: Date) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate.getTime() - now;
            const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setDays(daysLeft);
                setHours(hoursLeft);
                setMinutes(minutesLeft);
                setSeconds(secondsLeft);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countDownDate]);
    return [days, hours, minutes, seconds];
}

// outside click

export function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    const [isOutside, setIsOutSIde] = useState(false);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOutSIde(true);
            } else {
                setIsOutSIde(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    return isOutside;
}
