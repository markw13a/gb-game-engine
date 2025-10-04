import type { PropsWithChildren } from "react";

import styles from "./ConsoleShell.module.css";
import pikachu from "../../assets/console/pikachu.svg";
import pichu from "../../assets/console/pichu.svg";

export const ConsoleShell = ({ children }: PropsWithChildren) => (
	<div className={styles.console}>
		<img aria-hidden className={styles.pikachu} src={pikachu} />
		<img aria-hidden className={styles.pichu} src={pichu} />
        <div className={styles.title}>
            <span><i>GAME BOY</i></span>
            {ColorText}
        </div>
		<div className={styles.screen}>{children}</div>
	</div>
);

// Never needs to be rerendered
const ColorText = (
    <span>
        {"COLOR".split('').map((letter, index) => <span className={styles.rainbow} key={index}>{letter}</span>)}
    </span>
);