import styles from "./Tile.module.css";

type TileProps = {
	sprite: string;
	size: number;
};

export const Tile = ({ sprite, size }: TileProps) => {
	return (
		<div className={styles.container} style={{ width: size, height: size }}>
			<img className={styles.img} src={sprite} />
		</div>
	);
};
