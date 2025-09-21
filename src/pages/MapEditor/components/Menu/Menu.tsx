import { useState } from "react";
import styles from "./Menu.module.css";
import { Button } from "@/components/Button/Button";
import { ImportMapModal } from "../ImportMapModal/ImportMapModal";
import { Input } from "@/components/Input/Input";
import { EMPTY_TILE_SYMBOL } from "../../constants/constants";

type MenuProps<T> = {
	width: number;
	height: number;
	onWidthChange: (width: number) => void;
	onHeightChange: (height: number) => void;
	onOutputChange: (tiles: T[]) => void;
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
	onWidthChange,
	onHeightChange,
	onOutputChange,
	tileOptions,
	brush,
	mapString,
	onBrushChange,
	getBrushLabel,
	getBrushImgSrc,
	getTileFromSymbol,
}: MenuProps<T>) => {
	const [isImportModalOpen, setIsImportModalOpen] = useState(false);

	const onImport = (width: number, height: number, mapString: string) => {
		const nextOutput = mapString.split("").map((symbol) => {
			if (symbol === EMPTY_TILE_SYMBOL) {
				return null;
			}

			return getTileFromSymbol(symbol);
		});

		onWidthChange(width);
		onHeightChange(height);
		// @ts-expect-error TS assumes nextOutput can contain undefined, but we've guarded against this
		onOutputChange(nextOutput);
	};

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
				<div className={styles.controls}>
					<Input
						type="number"
						onChange={(e) => onWidthChange(parseInt(e.target.value, 10))}
						value={width}
					>
						Width (tiles)
					</Input>
					<Input
						type="number"
						onChange={(e) => onHeightChange(parseInt(e.target.value, 10))}
						value={height}
					>
						Height (tiles)
					</Input>
				</div>
				<div className={styles.outputContainer}>
					<label className={styles.control}>
						Output
						<textarea readOnly value={output} />
					</label>
				</div>
				<div>
					<Button onClick={() => setIsImportModalOpen(true)}>Import</Button>
				</div>
			</div>
			<ImportMapModal
				isOpen={isImportModalOpen}
				onClose={() => setIsImportModalOpen(false)}
				onImport={onImport}
			/>
		</>
	);
};
