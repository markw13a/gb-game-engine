import { useEffect, useRef } from "react";

import styles from "./AnimationTest.module.css";
import { scrollToEndHorizontal } from "../utils/scrollToEnd";

export const AnimationTest = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const animate = async () => {
            if (!ref.current) return;
            await scrollToEndHorizontal(ref.current);
        };

        animate();
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