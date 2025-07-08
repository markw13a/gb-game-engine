import { VIEW_AREA_SIDE_LENGTH } from './constants';

import styles from "./Map.module.css";
import { Tile } from "./Tile";

import map from '../../map/test.json';
import { useCallback, useEffect, useRef, useState } from 'react';
import { scrollToEndHorizontal } from '../../utils/scrollToEnd';

// ENABLE TO SEE ALL TILES AT THE SAME TIME
const DEBUG_MAP = false;

// TODO: Assert that this is a whole number
// TODO: Some kind of map checking util run before starting
const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// const getNextTileLeft = (pos: number) => pos - MAP_SIDE_LENGTH;
const getNextTileRight = (pos: number) => pos + MAP_SIDE_LENGTH;

const useScroll = ({ onScrollComplete }: { onScrollComplete: () => void }) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    // TODO: useTransition?
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = useCallback(async () => {
        if (scrollContainerRef.current === null) {
            return;
        }

        setIsScrolling(true);
        await scrollToEndHorizontal(scrollContainerRef.current, t => t * 0.01);
        setIsScrolling(false);
        onScrollComplete();
    }, [isScrolling, onScrollComplete]);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
    }
};

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

    if (DEBUG_MAP) {
        const sideLength = Math.sqrt(map.length);

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
        const coefficient = ((-1 + i) + 2 * (Math.floor(i / VIEW_AREA_SIDE_LENGTH)));

        return characterPos - MAP_SIDE_LENGTH + coefficient;
    };

    return (
        <div className={styles.container} ref={scrollContainerRef}>
            {
                Array.from({ length: Math.pow(VIEW_AREA_SIDE_LENGTH, 2) }).map((_, i) => (
                    <Tile key={i} mapIndex={mapIndex(i)} />
                ))
            }
            <Tile key="ani-column-row-1" mapIndex={(characterPos - 1 + (MAP_SIDE_LENGTH * 2))} />
            <Tile key="ani-column-row-2" mapIndex={characterPos + (MAP_SIDE_LENGTH * 2)} />
            <Tile key="ani-column-row-3" mapIndex={characterPos + 1 + (MAP_SIDE_LENGTH * 2)} />
        </div>
    );
};