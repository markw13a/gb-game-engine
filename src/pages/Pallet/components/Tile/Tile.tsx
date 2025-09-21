import styles from "./Tile.module.css";

type TileProps = {
	sprite: string | null;
	width?: number;
	height?: number;
};

export const Tile = ({ sprite, height = 1, width = 1 }: TileProps) => (
	<div
		className={styles.container}
		style={{ gridColumn: `span ${width}`, gridRow: `span ${height}` }}
	>
		{sprite && <img alt="tile-sprite" className={styles.img} src={sprite} />}
	</div>
);
