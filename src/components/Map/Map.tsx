import { useMemo, useState } from "react";
import { CharacterLayer } from "./components/CharacterLayer/CharacterLayer";
import type { Direction, Map as MapType, SpriteMap } from "../../types/types";
import { getMapSideLength, getNextTile } from "../../map/symbolicMap";
import { VirtualisedTileRenderer } from "./components/VirtualisedTileRenderer/VirtualisedTileRenderer";

import styles from './Map.module.css';
import { useKeyListener } from "../../hooks/useKeyListener/useKeyListener";

type MapProps = {
    map: MapType;
}

const characterSprites: SpriteMap = {
    moving: {
        left: '/clefairy/moving/left.gif',
        right: '/clefairy/moving/right.gif',
        up: '/clefairy/moving/up.gif',
        down: '/clefairy/moving/down.gif'
    },
    idle: {
        left: '/clefairy/static/left.png',
        right: '/clefairy/static/right.png',
        up: '/clefairy/static/up.png',
        down: '/clefairy/static/down.png'
    }
};

export const Map = ({ map }: MapProps) => {
    const [characterPos, setCharacterPos] = useState(60);
    const [isMoving, setIsMoving] = useState(false);
    const [characterDirection, setCharacterDirection] = useState<Direction>('down');

    const mapSideLength = getMapSideLength(map);

    const onMoveComplete = (dir: Direction) => setCharacterPos(getNextTile(characterPos, mapSideLength, dir));

    const onKeyPressed = () => setIsMoving(true);
    const onKeyReleased = () => setIsMoving(false);
    const options = useMemo(() => ({ ignoreRepeat: true }), [])
    
    useKeyListener('w', onKeyPressed, onKeyReleased, options);
    useKeyListener('a', onKeyPressed, onKeyReleased, options);
    useKeyListener('s', onKeyPressed, onKeyReleased, options);
    useKeyListener('d', onKeyPressed, onKeyReleased, options);

    return (
        <div className={styles.container}>
            <VirtualisedTileRenderer
                map={map} 
                characterPos={characterPos}
                onMoveStart={setCharacterDirection}
                onMoveComplete={onMoveComplete} 
            />
            <CharacterLayer 
                moving={isMoving} 
                sprites={characterSprites}
                direction={characterDirection} 
            />
        </div>
    )
};