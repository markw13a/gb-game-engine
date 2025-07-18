import styles from "./Map.module.css";
import { Tile } from "./Tile";

import { getDataForPosition, map } from '../../map/symbolicMap';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { calculateIndices } from "../../utils/calculateRange";
import { useKeyListener } from "../../hooks/useKeyListener";

// TODO: Assert that this is a whole number
// TODO: Some kind of map checking util run before starting
const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// Visible area of map is a square - will render SIDE_LENGTH * SIDE_LENGTH number of "tiles"
// Must be odd number (so character can be placed in the centre)
const VIEW_AREA_SIDE_LENGTH = 5;

// TODO: CSS should be tied to this
const TILE_SIZE_IN_PX = 50;

const getNextTileLeft = (pos: number) => pos - MAP_SIDE_LENGTH;
const getNextTileRight = (pos: number) => pos + MAP_SIDE_LENGTH;
const getNextTileUp = (pos: number) => pos - 1;
const getNextTileDown = (pos: number) => pos + 1;

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
    const [characterPos, setCharacterPos] = useState(17);
    const { scrollContainerRef, scroll, isScrolling } = useScroll();

    // TODO: Probably doesn't belong in here
    useEffect(verifyMapIntegrity, []);

    // TODO: Positive we don't need four separate functions!
    const moveRight = async () => {
        if (isScrolling) {
            return;
        }

        await scroll('right');
        setCharacterPos(getNextTileRight(characterPos));
    };

    const moveLeft = async () => {
        if (isScrolling) {
            return;
        }

        await scroll('left');
        setCharacterPos(getNextTileLeft(characterPos));
    };

    const moveUp = async () => {
        if (isScrolling) {
            return;
        }

        await scroll('up');
        setCharacterPos(getNextTileUp(characterPos));
    };

    const moveDown = async () => {
        if (isScrolling) {
            return;
        }

        await scroll('down');
        setCharacterPos(getNextTileDown(characterPos));
    };

    useKeyListener({ 'a': moveLeft, 'd': moveRight, 'w': moveUp, 's': moveDown });

    // Not entirely happy with the control flow and the useEffect/useLayoutEffect
    // Our movement animation is based on rendering additional layers of hidden tiles
    // Around the visible section. When rendering, we need to scroll to the centre of this container
    useLayoutEffect(() => {
        if (scrollContainerRef.current === null) return;
        // Want there to be one unseen tile to the left and right of the visible area
        scrollContainerRef.current.scrollLeft = TILE_SIZE_IN_PX;
        scrollContainerRef.current.scrollTop = TILE_SIZE_IN_PX;
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