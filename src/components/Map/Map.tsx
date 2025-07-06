import { VIEW_AREA_SIDE_LENGTH } from './constants';

import styles from "./Map.module.css";
import { Tile } from "./Tile";

import map from '../../map/test.json';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { scrollToEndHorizontal } from '../../utils/scrollToEnd';

// ENABLE TO SEE ALL TILES AT THE SAME TIME
const DEBUG_MAP = false;

// TODO: Assert that this is a whole number
// TODO: Some kind of map checking util run before starting
const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// const getNextTileLeft = (pos: number) => pos - MAP_SIDE_LENGTH;
const getNextTileRight = (pos: number) => pos + MAP_SIDE_LENGTH;

// Character moves in straight line back-and-forth
const useDebugMovement = (scrollContainer: RefObject<HTMLDivElement | null>): { characterPos: number; isMoving: boolean; } => {
    const [characterPos, setCharacterPos] = useState(7);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        // TODO: This coords system is pretty bad
        // We'll need to create some kind of abstraction if we want to work with it for real
        const walkRight = async () => {
            if (scrollContainer.current === null) return;

            const nextPos = getNextTileRight(characterPos);

            if (nextPos === 22) {
                setCharacterPos(7);
            } else {
                setIsMoving(true);
                await scrollToEndHorizontal(scrollContainer.current);
                setCharacterPos(nextPos);
                setIsMoving(false);
            }
        } 
        const id = setInterval(walkRight, 1000);

        return () => clearInterval(id);
    }, [characterPos, scrollContainer]);

    return { characterPos, isMoving };
};

export const Map = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { characterPos, isMoving } = useDebugMovement(ref);

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

    // TODO: The additional tile layer probably doesn't need to be conditionally rendered
    // On balance, you probably get more of a performance boost out of avoiding the state update rerendering the whole map!
    // Could alternatively restructure so that the movement state is contained within only the column? 
    return (
        <div className={styles.container} data-movement={isMoving} ref={ref}>
            {
                Array.from({ length: Math.pow(VIEW_AREA_SIDE_LENGTH, 2) }).map((_, i) => (
                    <Tile key={i} mapIndex={mapIndex(i)} />
                ))
            }
            { isMoving && (
                    <>
                        <Tile key="ani-column-row-1" mapIndex={(characterPos - 1 + (MAP_SIDE_LENGTH * 2))} />
                        <Tile key="ani-column-row-2" mapIndex={characterPos + (MAP_SIDE_LENGTH * 2)} />
                        <Tile key="ani-column-row-3" mapIndex={characterPos + 1 + (MAP_SIDE_LENGTH * 2)} />
                    </>
                )
            }
        </div>
    );
};