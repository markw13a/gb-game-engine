// TODO: We need to type this properly
// Probably makes sense to have a map-verify function in App.ts that errors if format is invalid
// Puts typed map in context if all good (map doesn't change no performance worries)
import map from '../../map/test.json';

import styles from './Tile.module.css';

type TileProps = {
    mapIndex: number;
    tileIndex: number;
};

export const Tile = ({ mapIndex, tileIndex }: TileProps) => {
    const props = map?.[mapIndex];

    // console.log({ mapIndex, tileIndex, props });

    if (!props) {
        return <div className={styles.tile} style={{ backgroundColor: 'black' }} />
    }

    return (
        <div className={styles.tile} style={{ backgroundColor: props.color }}>{mapIndex}</div>
    );
};