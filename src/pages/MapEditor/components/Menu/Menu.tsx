import { useState } from "react";
import styles from "./Menu.module.css";
import { Button } from "@/components/Button/Button";
import { ImportMapModal } from "../ImportMapModal/ImportMapModal";
import { ResizeMapModal } from "../ResizeMapModal/ResizeMapModal";

type MenuProps<T> = {
	width: number;
	height: number;
	onImport: (width: number, height: number, mapString: string) => void;
	onResize: (width: number, height: number) => void;
	tileOptions: T[];
	brush: T | undefined;
	mapString: string;
	onBrushChange: (brush: T) => void;
	getBrushLabel: (tile: T) => string;
	getBrushImgSrc: (tile: T) => string;
	getTileFromSymbol: (symbol: string) => T | undefined;
};

export const Menu = <T,>({
	width,
	height,
	onImport,
	onResize,
	tileOptions,
	brush,
	mapString,
	onBrushChange,
	getBrushLabel,
	getBrushImgSrc,
}: MenuProps<T>) => {
	const [isImportModalOpen, setIsImportModalOpen] = useState(false);
	const [isResizeModalOpen, setIsResizeModalOpen] = useState(false);

	const output = JSON.stringify(
		{
			dimensions: { width, height },
			map: mapString,
		},
		null,
		2,
	);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.tilesContainer}>
					<div className={styles.header}>
						Selected: {"\n"}
						{brush ? getBrushLabel(brush) : "None"}
					</div>
					<div className={styles.tiles}>
						{tileOptions.map((tile, index) => (
							<button
								className={styles.tile}
								aria-label={`Select ${getBrushLabel(tile)} brush`}
								onClick={() => onBrushChange(tile)}
								type="button"
								key={`${getBrushLabel(tile) + index}`}
							>
								<img alt={getBrushLabel(tile)} src={getBrushImgSrc(tile)} />
							</button>
						))}
					</div>
				</div>
				<div className={styles.outputContainer}>
					<label className={styles.control}>
						Output
						<textarea readOnly value={output} />
					</label>
				</div>
				<div className={styles.modals}>
					<Button onClick={() => setIsImportModalOpen(true)}>Import</Button>
					<Button onClick={() => setIsResizeModalOpen(true)}>Resize</Button>
				</div>
			</div>
			<div>
				<ImportMapModal
					isOpen={isImportModalOpen}
					onClose={() => setIsImportModalOpen(false)}
					onImport={onImport}
				/>
				{isResizeModalOpen && (
					<ResizeMapModal 
						onClose={() => setIsResizeModalOpen(false)}
						onResize={onResize}
						initialHeight={`${height}`}
						initialWidth={`${width}`}
					/>
				)}
			</div>
		</>
	);
};
