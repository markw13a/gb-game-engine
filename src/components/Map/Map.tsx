import { VIEW_AREA_SIDE_LENGTH } from './constants';

import styles from "./Map.module.css";
import { Tile } from "./Tile";

import map from '../../map/test.json';

const character_pos = 12;

// ENABLE TO SEE ALL TILES AT THE SAME TIME
const DEBUG_MAP = false;

export const Map = () => {
    if (character_pos < 0 || character_pos >= map.length) {
        throw new Error("Character out of bounds");
    }

    if (DEBUG_MAP) {
        const sideLength = Math.sqrt(map.length);

        console.log(map.length)

        return (
            <div className={styles.debugContainer} style={{ gridTemplateColumns: `repeat(${sideLength}, 1fr)`, gridTemplateRows: `repeat(${sideLength}, 1fr)` }}>
                {
                    map.map((tile, i) => (
                        <div key={i} style={{ backgroundColor: tile.color, height: '50px', width: '50px' }} />
                    ))
                }
            </div>
        );
    }

    const mapIndex = (i: number) => {
        const mapSideLength = Math.sqrt(map.length);
        const coefficient = ((-1 + i) + 2 * (Math.floor(i / VIEW_AREA_SIDE_LENGTH)));

        const total = character_pos - mapSideLength + coefficient;

        console.log({ i, character_pos, mapSideLength, coefficient, total });

        return character_pos - mapSideLength + coefficient;
    };

    return (
        <div className={styles.container}>
            {
                Array.from({ length: Math.pow(VIEW_AREA_SIDE_LENGTH, 2) }).map((_, i) => (
                    <Tile key={i} mapIndex={mapIndex(i)} tileIndex={i} />
                ))
            }
        </div>
    );
};