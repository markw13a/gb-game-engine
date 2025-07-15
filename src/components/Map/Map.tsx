import styles from "./Map.module.css";
import { Tile } from "./Tile";

import { getDataForPosition, map } from '../../map/symbolicMap';
import { useEffect, useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { calculateIndices } from "../../utils/calculateRange";

// TODO: Assert that this is a whole number
// TODO: Some kind of map checking util run before starting
const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// Visible area of map is a square - will render SIDE_LENGTH * SIDE_LENGTH number of "tiles"
// Must be odd number (so character can be placed in the centre)
const VIEW_AREA_SIDE_LENGTH = 3;

// const getNextTileLeft = (pos: number) => pos - MAP_SIDE_LENGTH;
const getNextTileRight = (pos: number) => pos + MAP_SIDE_LENGTH;

// TODO: Abstract 'visible area' code to its own module?
// Makes sense, kind of spread out right now
const getVisibleTiles = (pos: number) => 
    calculateIndices(VIEW_AREA_SIDE_LENGTH, MAP_SIDE_LENGTH, pos)
    .map(i => getDataForPosition(i));

// If square-root of map's length does not form a whole number,
// it doesn't have the right number of entries to render a square grid.
const verifyMapIntegrity = () => {
    const isMapSquare = Number.isInteger(MAP_SIDE_LENGTH);
    
    if (!isMapSquare) {
        throw new Error(`
            Invalid Map error: length ${map.length} does not represent a square grid. 
            Square root of length must be whole number to represent an n x n grid (calculated ${MAP_SIDE_LENGTH})
        `);
    }
};

export const Map = () => {
    const [characterPos, setCharacterPos] = useState(31);
    const { scrollContainerRef, scroll } = useScroll({
        onScrollComplete: () => setCharacterPos((pos) => getNextTileRight(pos))
    });

    useEffect(verifyMapIntegrity, []);

    // HACK: Run again following onScrollComplete updating character positions
    useEffect(() => {
        // scroll();
    }, [characterPos])

    if (characterPos < 0 || characterPos >= map.length) {
        throw new Error("Character out of bounds");
    }

    const tileData = getVisibleTiles(characterPos);

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {tileData.map((tile, i) => (
                <Tile key={i} color={tile.color} label={`${tile.mapIndex}`} />
            ))}
        </div>
    );
};