import styles from './Tile.module.css';

type TileProps = {
    color: string;
    label: string;
};

export const Tile = ({ color, label }: TileProps) => {
    return (
        <div className={styles.tile} style={{ backgroundColor: color }}>{label}</div>
    );
};