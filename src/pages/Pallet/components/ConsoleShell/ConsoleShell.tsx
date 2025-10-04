import type { PropsWithChildren } from "react";

import styles from "./ConsoleShell.module.css";
import pikachu from "../../assets/console/pikachu.svg";
import pichu from "../../assets/console/pichu.svg";

export const ConsoleShell = ({ children }: PropsWithChildren) => (
	<div className={styles.console}>
		<img aria-hidden className={styles.pikachu} src={pikachu} />
		<img aria-hidden className={styles.pichu} src={pichu} />
		<div className={styles.screen}>{children}</div>
	</div>
);
