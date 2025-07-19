import styles from "./Map.module.css";
import { Tile } from "../Tile/Tile";

import { getMapSideLength, getNextTile, getVisibleTiles } from '../../map/symbolicMap';
import { useLayoutEffect, useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { useKeyListener } from "../../hooks/useKeyListener";
import type { Map as MapType, ScrollDirection } from "../../types/types";

type MapProps = {
    initialPosition?: number;
    map: MapType;
    tileSize?: number;
    viewAreaSize?: number;
};

export const Map = ({ initialPosition = 17, map, tileSize = 50, viewAreaSize = 5 }: MapProps) => {
    const [characterPos, setCharacterPos] = useState(initialPosition);
    const { scrollContainerRef, scroll, isScrolling } = useScroll();

    const mapSideLength = getMapSideLength(map);

    const move = async (dir: ScrollDirection) => {
        if (isScrolling) {
            return;
        }

        const nextTile = getNextTile(characterPos, mapSideLength, dir);
        const isPassable = map[nextTile]?.isPassable;

        if (!isPassable) return;

        await scroll(dir);
        setCharacterPos(getNextTile(characterPos, mapSideLength, dir));
    };

    useKeyListener({ 
        'a': () => move('left'), 
        'd': () => move('right'), 
        'w': () => move('up'), 
        's': () => move('down') 
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

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {tileData.map((tile, i) => (
                <Tile key={i} color={tile.color} label={`${tile.mapIndex}`} size={tileSize} />
            ))}
        </div>
    );
};