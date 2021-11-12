import {RefObject, useEffect, useState} from "react";

export const useOnScreen = (ref: RefObject<any>) => {
    const [isIntersecting, setIntersecting] = useState(false)
    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        observer.observe(ref.current)
        return () => {
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}

export default useOnScreen;