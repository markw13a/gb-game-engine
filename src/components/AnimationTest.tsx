import { useEffect, useRef } from "react";

import styles from "./AnimationTest.module.css";

let xpos = 0;

export const AnimationTest = () => {
    const spanRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const move = () => {
            if (!spanRef.current) return;

            xpos++;
            spanRef.current.style.transform = `translateX(${xpos}px)`;

            if (xpos < 300) {
                requestAnimationFrame(move)
            }
        };

        requestAnimationFrame(move);
    }, [])

    return (
        <div>
            <div className={styles.animationTest} ref={spanRef} />
        </div>
    );
};