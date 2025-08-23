import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";

import styles from "./ImportMapModal.module.css";

type ImportMapModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onImport: (width: number, height: number, input: string) => void;
};

export const ImportMapModal = ({
	onImport,
	onClose,
	...props
}: ImportMapModalProps) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [input, setInput] = useState("");

	const onClick = () => {
		onImport(width, height, input);
		onClose();
	};

	return (
		<Modal {...props}>
			<div className={styles.container}>
				<div className={styles.contents}>
					<Input
						onChange={(e) => setWidth(parseInt(e.target.value))}
						type="number"
						value={width}
					>
						Width (tiles)
					</Input>
					<Input
						onChange={(e) => setHeight(parseInt(e.target.value))}
						type="number"
						value={height}
					>
						Height (tiles)
					</Input>
					<Input onChange={(e) => setInput(e.target.value)} value={input}>
						Map string
					</Input>
				</div>
				<div className={styles.footer}>
					<Button onClick={onClose}>Close</Button>
					<Button onClick={onClick}>Import</Button>
				</div>
			</div>
		</Modal>
	);
};
