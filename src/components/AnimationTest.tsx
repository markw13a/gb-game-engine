import { useEffect, useRef } from "react";

import styles from "./AnimationTest.module.css";

const MOVE_SPEED = 0.01;

export const AnimationTest = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let lastFrameTimestamp: number = Date.now();
        let currentScrollPos = 0;

        const move = () => {
            if (!ref.current) return;

            // Can't rely on offsetWidth because it's rounded to nearest integer -- it's actually not possible to set scrollLeft this high!
            // Therefore, need to figure out an alternative method of determining whether the element has finished scrolling
            // Browser renders 3 sub-pixels -- no visible difference in position beyond offsetWidth - 0.33
            const scrollLeftMax = ref.current.scrollWidth - 0.33;

            const timestamp = Date.now();
            const timeElapsed = timestamp - lastFrameTimestamp;
            const distanceToScroll = MOVE_SPEED * timeElapsed;

            const nextScrollPos = currentScrollPos + distanceToScroll;

            ref.current.scrollLeft = nextScrollPos;
            currentScrollPos = nextScrollPos;
            lastFrameTimestamp = timestamp;

            // Scrolling beyond this point has no effect on rendered output, so stop
            if (currentScrollPos >= scrollLeftMax) {
                return;
            }

            requestAnimationFrame(move)
        };
 
        requestAnimationFrame(move);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.subContainer} ref={ref}>
                <div className={`${styles.animationTest} ${styles.red}`} />
                <div className={`${styles.animationTest} ${styles.orange}`} />
                <div className={`${styles.animationTest} ${styles.yellow}`} />
                <div className={`${styles.animationTest} ${styles.green}`} />
                <div className={`${styles.animationTest} ${styles.blue}`} />
                <div className={`${styles.animationTest} ${styles.indigo}`} />
                <div className={`${styles.animationTest} ${styles.violet}`} />
            </div>
        </div>
    );
};