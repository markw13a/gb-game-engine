import type { PropsWithChildren } from "react"

import styles from './Button.module.css';

type ButtonProps = {
    onClick: () => void;
}

export const Button = ({ children, onClick }: PropsWithChildren<ButtonProps>) => (
    <button className={styles.button} type="button" onClick={onClick}>
        {children}
    </button>
)