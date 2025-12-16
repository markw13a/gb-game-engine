import { useState } from "react";
import styles from "./MapEditor.module.css";
import { Menu } from "./components/Menu/Menu";
import { TileGrid } from "./components/Map/TileGrid";
import { EMPTY_TILE_SYMBOL } from "./constants/constants";
import { appendColumns, appendRows } from "./utils/map";

type MapEditorProps<T> = {
	tileSize: string;
	tileOptions: T[];
	getTileSymbol: (tile: T) => string;
	getTileFromSymbol: (symbol: string) => T | undefined;
	getTileLabel: (tile: T) => string;
	getTileImgSrc: (tile: T) => string;
};

export const MapEditor = <T,>({
	tileSize,
	tileOptions,
	getTileSymbol,
	getTileLabel,
	getTileImgSrc,
	getTileFromSymbol,
}: MapEditorProps<T>) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [output, setOutput] = useState<(T | null)[]>([]);
	const [brush, setBrush] = useState<T>();

	const onImport = (width: number, height: number, mapString: string) => {
		const nextOutput = mapString.split("").map((symbol) => {
			if (symbol === EMPTY_TILE_SYMBOL) {
				return null;
			}

			return getTileFromSymbol(symbol);
		});

		setWidth(width);
		setHeight(height);
		// @ts-expect-error TS assumes nextOutput can contain undefined, but we've guarded against this
		setOutput(nextOutput);
	};

	const onResize = (nextWidth: number, nextHeight: number) => {
		const outWithRows = appendRows(output, height, nextHeight - height);
		const outWithColumns = appendColumns(
			outWithRows,
			nextHeight,
			nextWidth - width,
		);

		setWidth(nextWidth);
		setHeight(nextHeight);
		// @ts-expect-error TODO: complains because in/out of this function is unknown[] - tighten the type
		setOutput(outWithColumns);
	};

	const onTileClick = (index: number) => {
		if (!brush) {
			return;
		}

		// TODO: Could perform very poorly for a large array
		const nextOutput = [...output];
		nextOutput[index] = brush;

		setOutput(nextOutput);
	};

	const mapString = output.reduce((str, tile) => {
		if (tile === null) {
			return str + EMPTY_TILE_SYMBOL;
		}

		return str + getTileSymbol(tile);
	}, "");

	return (
		<div className={styles.container}>
			<TileGrid
				width={width}
				height={height}
				tileSize={tileSize}
				tiles={output}
				getTileLabel={getTileLabel}
				getTileImgSrc={getTileImgSrc}
				onClickTile={(i) => onTileClick(i)}
			/>
			<Menu
				width={width}
				height={height}
				onImport={onImport}
				onResize={onResize}
				tileOptions={tileOptions}
				brush={brush}
				mapString={mapString}
				onBrushChange={setBrush}
				getBrushLabel={(t) => (t ? getTileLabel(t) : "")}
				getBrushImgSrc={(t) => (t ? getTileImgSrc(t) : "")}
				getTileFromSymbol={getTileFromSymbol}
			/>
		</div>
	);
};
