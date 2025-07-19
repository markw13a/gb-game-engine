import styles from "./BackgroundLayer.module.css";
import { Tile } from "../Tile/Tile";

import { getMapSideLength, getNextTile, getVisibleTiles } from '../../map/symbolicMap';
import { useLayoutEffect } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { useKeyListener } from "../../hooks/useKeyListener";
import type { Map, Direction } from "../../types/types";

type BackgroundLayerProps = {
    characterPos: number;
    map: Map;
    tileSize?: number;
    viewAreaSize?: number;
    onMoveStart: (dir: Direction) => void;
    onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const BackgroundLayer = ({ 
    characterPos, 
    map, 
    tileSize = 50, 
    viewAreaSize = 5,
    onMoveStart,
    onMoveComplete
}: BackgroundLayerProps) => {
    const { scrollContainerRef, scroll, isScrolling } = useScroll();

    const mapSideLength = getMapSideLength(map);

    const move = async (dir: Direction) => {
        const nextTile = getNextTile(characterPos, mapSideLength, dir);
        const isPassable = map[nextTile]?.isPassable;

        if (!isPassable || isScrolling) return;

        onMoveStart(dir);
        await scroll(dir);
        onMoveComplete(dir);
    };

    useKeyListener({ 
        'a': () => move('left'), 
        'd': () => move('right'), 
        'w': () => move('up'), 
        's': () => move('down'),
        'q': () => console.log('PRESSED'),
    });

    // Our movement animation is based on rendering additional layers of hidden tiles
    // Around the visible section. When rendering, we need to scroll to the centre of this container
    useLayoutEffect(() => {
        if (scrollContainerRef.current === null) return;
        // Want there to be one unseen tile to the left and right of the visible area
        scrollContainerRef.current.scrollLeft = tileSize;
        scrollContainerRef.current.scrollTop = tileSize;
    }, [characterPos, scrollContainerRef, tileSize])

    // TODO: Unsure if this is still needed
    if (characterPos < 0 || characterPos >= map.length) {
        throw new Error("Character out of bounds");
    }

    const tileData = getVisibleTiles(characterPos, viewAreaSize, mapSideLength);

    console.log({ tileData });

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {tileData.map((tile, i) => <Tile key={i} color={tile.color} label={`${tile.mapIndex}`} size={tileSize} />)}
        </div>
    );
};