import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import { useState } from "react";

import styles from './ResizeMapModal.module.css';

type ResizeMapModal = {
    onClose: () => void;
	onResize: (width: number, height: number) => void;
    initialHeight: string;
    initialWidth: string;
}

export const ResizeMapModal = ({
    onClose,
    onResize,
    initialHeight,
    initialWidth
}: ResizeMapModal) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [showError, setShowError] = useState(false);

    const onClick = () => {
        // Prevent NaN value being set
        if (!width || !height) {
            setShowError(true);
            return;
        }

        onResize(parseInt(width, 10), parseInt(height, 10));
        onClose();
    };

    return (
        <Modal isOpen>
			<div className={styles.container}>
				<div className={styles.contents}>
					<Input type="number" onChange={(e) => setWidth(e.target.value)} value={width}>
						Width (tiles)
					</Input>
					<Input type="number" onChange={(e) => setHeight(e.target.value)} value={height}>
						Height (tiles)
					</Input>
                    {showError && <span className={styles.error}>These fields are required</span>}
				</div>
				<div className={styles.footer}>
					<Button onClick={onClose}>Close</Button>
					<Button onClick={onClick}>Update</Button>
				</div>
			</div>
        </Modal>
    )
};