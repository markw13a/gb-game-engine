import type { PropsWithChildren } from "react";

import styles from './Modal.module.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.container} role="dialog">
            <div className={styles.modal}>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.footer}>
                    <button type="button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
};