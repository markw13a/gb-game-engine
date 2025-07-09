import { VIEW_AREA_SIDE_LENGTH } from './constants';

import styles from "./Map.module.css";
import { Tile } from "./Tile";

import { getColorForPosition, getDataForSymbol, map } from '../../map/symbolicMap';
import { useEffect, useState } from 'react';
import { useScroll } from '../../hooks/useScroll';

// ENABLE TO SEE ALL TILES AT THE SAME TIME
// const DEBUG_MAP = false;

// TODO: Assert that this is a whole number
// TODO: Some kind of map checking util run before starting
const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// const getNextTileLeft = (pos: number) => pos - MAP_SIDE_LENGTH;
const getNextTileRight = (pos: number) => pos + MAP_SIDE_LENGTH;

export const Map = () => {
    const [characterPos, setCharacterPos] = useState(7);
    const { scrollContainerRef, scroll } = useScroll({
        onScrollComplete: () => setCharacterPos((pos) => {
            const nPos = getNextTileRight(pos);

            if (nPos === 22) {
                return 7;
            }

            return nPos;
        })
    });

    // HACK: Run again following onScrollComplete updating character positions
    useEffect(() => {
        scroll()
    }, [characterPos])

    if (characterPos < 0 || characterPos >= map.length) {
        throw new Error("Character out of bounds");
    }

    // TODO: Move to different component if we're keeping this
    // if (DEBUG_MAP) {
    //     const sideLength = Math.sqrt(map.length);

    //     return (
    //         <div className={styles.debugContainer} style={{ gridTemplateColumns: `repeat(${sideLength}, 1fr)`, gridTemplateRows: `repeat(${sideLength}, 1fr)` }}>
    //             {
    //                 map.map((tile, i) => (
    //                     <div key={i} style={{ backgroundColor: tile.color, height: '50px', width: '50px' }} />
    //                 ))
    //             }
    //         </div>
    //     );
    // }

    // TODO: Old map was column-by-column, whereas new map is row-by-row
    // Need to fix this function to reflect that
    const mapIndex = (i: number) => {
        const coefficient = ((-1 + i) + 2 * (Math.floor(i / VIEW_AREA_SIDE_LENGTH)));

        return characterPos - MAP_SIDE_LENGTH + coefficient;
    };

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {
                Array.from({ length: Math.pow(VIEW_AREA_SIDE_LENGTH, 2) }).map((_, i) => (
                    <Tile key={i} color={getColorForPosition(mapIndex(i))} label={`${i}`} />
                ))
            }
            <Tile 
                key="post-column-row-1" 
                color={getColorForPosition(characterPos - 1 + (MAP_SIDE_LENGTH * 2))} 
                label={`${characterPos - 1 + (MAP_SIDE_LENGTH * 2)}`} 
            />
            <Tile 
                key="post-column-row-2" 
                color={getColorForPosition(characterPos + (MAP_SIDE_LENGTH * 2))} 
                label={`${characterPos + (MAP_SIDE_LENGTH * 2)}`} 
            />
            <Tile 
                key="post-column-row-3" 
                color={getColorForPosition(characterPos + 1 + (MAP_SIDE_LENGTH * 2))} 
                label={`${characterPos + 1 + (MAP_SIDE_LENGTH * 2)}`} 
            />
        </div>
    );
};