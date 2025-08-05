import styles from "./BackgroundLayer.module.css";
import { Tile } from "../../../Tile/Tile";

import { getMapSideLength, getNextTile, getVisibleTiles } from '../../../../map/symbolicMap';
import { useLayoutEffect } from 'react';
import { useScroll } from '../../../../hooks/useScroll';
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map, Direction } from "../../../../types/types";

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
    // TODO: Most of this should probably be moved up to Map
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

    useWhileKeyPressed({ 
        'a': () => move('left'), 
        'd': () => move('right'), 
        'w': () => move('up'), 
        's': () => move('down'),
    });

    // Our movement animation is based on rendering additional layers of hidden tiles
    // Around the visible section. When rendering, we need to scroll to the centre of this container
    // TODO: Can this be moved to within useScroll or another component? Doesn't feel like this component should be responsible for setting this up
    useLayoutEffect(() => {
        if (scrollContainerRef.current === null) return;
        // Want there to be one unseen tile to the left and right of the visible area
        scrollContainerRef.current.scrollLeft = tileSize;
        scrollContainerRef.current.scrollTop = tileSize;
    })

    const tileData = getVisibleTiles(characterPos, viewAreaSize, mapSideLength);

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {tileData.map((tile, i) => <Tile key={i} color={tile.color} label={`${tile.mapIndex}`} size={tileSize} />)}
        </div>
    );
};