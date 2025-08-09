import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../../../Tile/Tile";

import { getMapSideLength, getNextTile, getVisibleTiles } from '../../../../map/symbolicMap';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { useScroll } from '../../../../hooks/useScroll';
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map, Direction } from "../../../../types/types";

type VirtualisedTileRendererProps = {
    characterPos: number;
    map: Map;
    tileSize?: number;
    viewAreaSize?: number;
    onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = ({ 
    characterPos, 
    map, 
    tileSize = 50, 
    viewAreaSize = 5,
    onMoveComplete
}: VirtualisedTileRendererProps) => {
    // TODO: Most of this should probably be moved up to Map
    const { scrollContainerRef, scroll, isScrollingRef } = useScroll();

    const mapSideLength = getMapSideLength(map);

    // TODO: Component probably should not be responsible for this
    // TODO: Fix bug when calling at frequency higher than 250ms
    const move = useCallback(async (dir: Direction) => {
        const nextTile = getNextTile(characterPos, mapSideLength, dir);
        const isPassable = map[nextTile]?.isPassable;

        if (!isPassable || isScrollingRef.current) {
            return;
        }

        await scroll(dir);
        onMoveComplete(dir);
    }, [onMoveComplete, characterPos]);

    // Must be memoise to avoid key listeners being recreated every render
    // Leads to interesting bug where keyup events is sometimes not detected
    const keyMap = useMemo(() => ({ 
        'a': () => move('left'), 
        'd': () => move('right'), 
        'w': () => move('up'), 
        's': () => move('down'),
     }), [move])

    // TODO: Would like to move this out of this component
    useWhileKeyPressed(keyMap);

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