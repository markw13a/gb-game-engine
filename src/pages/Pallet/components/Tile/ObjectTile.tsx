import styles from "./ObjectTile.module.css";

type ObjectTile = {
	tileSize: number;
	sprite?: string;
	width?: number;
	height?: number;
};

export const ObjectTile = ({
	tileSize,
	sprite,
	width = 1,
	height = 1,
}: ObjectTile) => (
	<div
		className={styles.container}
		style={{ width: tileSize, height: tileSize }}
	>
		{sprite && (
			<img
				src={sprite}
				style={{ width: width * tileSize, height: height * tileSize }}
			/>
		)}
	</div>
);
