import type { PropsWithChildren } from "react";
import borderOrnament from "../assets/border-ornament.svg";
import styles from './DialogContainer.module.css';

type SupportedClass = "container" | "contentsContainer" | "contents"

type DialogContainerProps = {
    classNames?: Partial<Record<SupportedClass, string>>;
}

export const DialogContainer = ({ children, classNames }: PropsWithChildren<DialogContainerProps>) => (
    <div className={`${styles.container} ${classNames?.container}`}>
        <div className={`${styles.contentsContainer} ${classNames?.contentsContainer}`}>
            <div className={`${styles.contents} ${classNames?.contents}`}>
                {children}
            </div>
        </div>
        <div className={styles.borderOrnaments}>
            <img aria-hidden src={borderOrnament} />
            <img aria-hidden src={borderOrnament} />
            <img aria-hidden src={borderOrnament} />
            <img aria-hidden src={borderOrnament} />
        </div>
    </div>
) 