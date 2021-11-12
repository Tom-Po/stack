import {useEffect, useState} from 'react';

export const SCROLL_UP = 'up';
export const SCROLL_DOWN = 'down';
export const BOTTOM_REACHED = 'bottom';
export const TOP_REACHED = 'top';

export const useScrollWatcher = ({initialDirection = SCROLL_DOWN, thresholdPixels = 64, ref = null} = {}) => {
    const [scrollDir, setScrollDir] = useState(initialDirection);
    let item: any = document.body
    if (ref !== null) {
        item = ref
    }
    useEffect(
        () => {
            const threshold = thresholdPixels || 0;
            let lastScrollY = item.scrollTop;
            let ticking = false;
            const updateScrollDir = () => {
                const scrollY = item.scrollTop;

                if (Math.abs(scrollY - lastScrollY) < threshold) {
                    ticking = false;
                    return;
                }
                let scrollState = scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP;
                if ((item.scrollHeight - item.clientHeight - item.offsetTop - item.scrollTop) < 200) {
                    scrollState = BOTTOM_REACHED;
                }
                if(item.scrollTop < 100){
                    scrollState = TOP_REACHED
                }
                setScrollDir(scrollState);
                lastScrollY = scrollY > 0 ? scrollY : 0;
                ticking = false;
            };

            const onScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateScrollDir);
                    ticking = true;
                }
            };

            item.addEventListener('scroll', onScroll, {
                passive: true
            });

            return () => item.removeEventListener('scroll', onScroll);
        },
        [initialDirection, thresholdPixels, ref],
    );

    return scrollDir;
};

