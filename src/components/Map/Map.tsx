import styles from "./Map.module.css";
import { Tile } from "./Tile";

import { getNextTile, getVisibleTiles, map, TILE_SIZE_IN_PX } from '../../map/symbolicMap';
import { useLayoutEffect, useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { useKeyListener } from "../../hooks/useKeyListener";
import type { ScrollDirection } from "../../types/types";

export const Map = () => {
    const [characterPos, setCharacterPos] = useState(17);
    const { scrollContainerRef, scroll, isScrolling } = useScroll();

    const move = async (dir: ScrollDirection) => {
        if (isScrolling) {
            return;
        }

        await scroll(dir);
        setCharacterPos(getNextTile(characterPos, dir));
    };

    useKeyListener({ 
        'a': () => move('left'), 
        'd': () => move('right'), 
        'w': () => move('up'), 
        's': () => move('down') 
    });

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
                <Tile key={i} color={tile.color} label={`${tile.mapIndex}`} size={TILE_SIZE_IN_PX} />
            ))}
        </div>
    );
};