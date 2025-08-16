import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../../../Tile/Tile";

import { getMapSideLength, getNextTile, getVisibleTiles } from '../../../../map/symbolicMap';
import { useCallback, useLayoutEffect } from 'react';
import { useScroll } from '../../../../hooks/useScroll';
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map } from "../../../../types/map";
import type { Direction } from "../../../../types/sprite";

type VirtualisedTileRendererProps = {
    characterPos: number;
    map: Map;
    tileSize?: number;
    viewAreaSize?: number;
    onMoveStart: (dir: Direction) => void;
    onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = ({ 
    characterPos, 
    map, 
    tileSize = 50, 
    viewAreaSize = 5,
    onMoveStart,
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

        onMoveStart(dir);
        await scroll(dir);
        onMoveComplete(dir);
    }, [onMoveComplete, characterPos]);

    // TODO: Would like to move this out of this component
    useWhileKeyPressed('a', () => move('left'), 100);
    useWhileKeyPressed('d', () => move('right'), 100);
    useWhileKeyPressed('w', () => move('up'), 100);
    useWhileKeyPressed('s', () => move('down'), 100);

    // Our movement animation is based on rendering additional layers of hidden tiles
    // Around the visible section. When rendering, we need to scroll to the centre of this container
    useLayoutEffect(() => {
        if (scrollContainerRef.current === null) return;
        // Want there to be one unseen tile to the left and right of the visible area
        scrollContainerRef.current.scrollLeft = tileSize;
        scrollContainerRef.current.scrollTop = tileSize;
    }, [characterPos])

    const tileData = getVisibleTiles(characterPos, viewAreaSize, mapSideLength);

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {
                tileData.map((tile, i) => 
                    <Tile 
                        key={i} 
                        color={tile.color} 
                        label={`${tile.mapIndex}`} 
                        size={tileSize} 
                    />
                )
            }
        </div>
    );
};