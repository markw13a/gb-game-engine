import type { PropsWithChildren } from "react";

import styles from "./ConsoleShell.module.css";
import pikachu from "../../assets/console/pikachu.svg";
import pichu from "../../assets/console/pichu.svg";

export const ConsoleShell = ({ children }: PropsWithChildren) => (
	<div className={styles.console}>
        <div className={styles.screenContainer}>
            <img aria-hidden className={styles.pikachu} src={pikachu} />
            <img aria-hidden className={styles.pichu} src={pichu} />
            <div className={styles.title}>
                <span><i>GAME BOY</i></span>
                {ColorText}
            </div>
            <div className={styles.screen}>{children}</div>
        </div>
        <div className={styles.controlsContainer}>
            <div className={styles.movementControl}>
                <span className={styles.up}>W</span>
                <span className={styles.down}>S</span>
                <span className={styles.left}>A</span>
                <span className={styles.right}>D</span>
                <span className={styles.center} />
            </div>
            <div className={styles.actionControls}>
                <span className={styles.actionSecondary}>Q</span>
                <span className={styles.actionPrimary}>E</span>
            </div>
        </div>
	</div>
);

// Never needs to be rerendered
const ColorText = (
    <span>
        {"COLOR".split('').map((letter, index) => <span className={styles.rainbow} key={index}>{letter}</span>)}
    </span>
);