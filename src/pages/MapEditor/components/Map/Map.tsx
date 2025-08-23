import styles from "./Map.module.css";

type MapProps<T> = {
	width: number;
	height: number;
	tileSize: string;
	tiles: (T | null)[];
	getTileLabel: (tile: T) => string;
	getTileImgSrc: (tile: T) => string;
	onClickTile: (i: number) => void;
};

export const Map = <T,>({
	width,
	height,
	tileSize,
	tiles,
	getTileLabel,
	getTileImgSrc,
	onClickTile,
}: MapProps<T>) => {
	return (
		<div className={styles.mapContainer}>
			<div
				className={styles.map}
				style={{
					gridTemplateColumns: `repeat(${width}, ${tileSize})`,
					gridTemplateRows: `repeat(${height}, ${tileSize})`,
				}}
			>
				{tiles.map((tile, index) =>
					tile === null ? (
						<div
							aria-label="Empty tile"
							className={styles.emptyTile}
							style={{ width: tileSize, height: tileSize }}
							onClick={() => onClickTile(index)}
							key={index}
						/>
					) : (
						<div
							aria-label={`${getTileLabel(tile)} tile`}
							className={styles.tile}
							style={{ width: tileSize, height: tileSize }}
							onClick={() => onClickTile(index)}
							key={index}
						>
							<img
								src={getTileImgSrc(tile)}
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
};
