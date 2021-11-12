import {useEffect, useState} from "react";

export const useThrottle = (value: any, delay: number) => {
    const [throttled, setThrottled] = useState(value);
    const [wait, setWait] = useState(false);
    useEffect(
        () => {
            setWait(true);
            setThrottled(value)

            const handler = setTimeout(() => {
                setWait(false)
            }, delay)

            return () => {
                clearTimeout(handler)
            }
        },
        [value]
    )
    if (wait) return;
    return throttled;
}

export default useThrottle;