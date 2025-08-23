import type { PropsWithChildren } from "react";

import styles from "./Modal.module.css";

type ModalProps = {
	isOpen: boolean;
};

// TODO: Keyboard controls
export const Modal = ({ isOpen, children }: PropsWithChildren<ModalProps>) => {
	if (!isOpen) {
		return null;
	}

	return (
		<dialog className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.body}>{children}</div>
			</div>
		</dialog>
	);
};
