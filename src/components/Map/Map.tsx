import { useState } from "react";
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
    const [characterPos, setCharacterPos] = useState(57);
    const [isMoving, setIsMoving] = useState(false);
    const [characterDirection, setCharacterDirection] = useState<Direction>('down');

    const mapSideLength = getMapSideLength(map);

    const onKeyPressed = (dir: Direction) => {
        setCharacterDirection(dir);
        setIsMoving(true);
    };

    const getKeyConfig = (dir: Direction) => ({
        onKeyPressed: () => onKeyPressed(dir),
        onKeyReleased: () => setIsMoving(false)
    })

    const onMoveComplete = (dir: Direction) => {
        setCharacterPos(getNextTile(characterPos, mapSideLength, dir));
    };

    useKeyListener({
        'w': getKeyConfig('up'),
        'a': getKeyConfig('left'),
        's': getKeyConfig('down'),
        'd': getKeyConfig('right')
    }, { ignoreRepeat: true })

    return (
        <div className={styles.container}>
            <VirtualisedTileRenderer
                map={map} 
                characterPos={characterPos}
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