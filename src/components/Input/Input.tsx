import type { PropsWithChildren, InputHTMLAttributes } from "react";

import styles from './Input.module.css';

export const Input = ({ children, onChange, value }: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) => {
    return (
        <label className={styles.container}>
            {children}
            <input className={styles.input} onChange={onChange} value={value} />
        </label>
    );
}