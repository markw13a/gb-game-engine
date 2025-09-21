import styles from "./TileGrid.module.css";

type TileGridProps<T> = {
	width: number;
	height: number;
	tileSize: string;
	tiles: (T | null)[];
	getTileLabel: (tile: T) => string;
	getTileImgSrc: (tile: T) => string;
	onClickTile: (i: number) => void;
};

export const TileGrid = <T,>({
	width,
	height,
	tileSize,
	tiles,
	getTileLabel,
	getTileImgSrc,
	onClickTile,
}: TileGridProps<T>) => {
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
						<button
							data-testid="Empty tile"
							className={styles.emptyTile}
							style={{ width: tileSize, height: tileSize }}
							onClick={() => onClickTile(index)}
							key={index}
							type="button"
						/>
					) : (
						<button
							data-testid={`${getTileLabel(tile)} tile`}
							className={styles.tile}
							style={{ width: tileSize, height: tileSize }}
							onClick={() => onClickTile(index)}
							key={index}
							type="button"
						>
							<img
								alt={`${getTileLabel(tile)}`}
								src={getTileImgSrc(tile)}
								style={{ width: "100%", height: "100%" }}
							/>
						</button>
					),
				)}
			</div>
		</div>
	);
};
