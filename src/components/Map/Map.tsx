import { useState } from "react";
import { CharacterLayer } from "./components/CharacterLayer/CharacterLayer";
import type { Direction, Map as MapType, SpriteMap } from "../../types/types";
import { getMapSideLength, getNextTile } from "../../map/symbolicMap";
import { BackgroundLayer } from "./components/BackgroundLayer/BackgroundLayer";

import styles from './Map.module.css';

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

    const onMoveStart = async (dir: Direction) => {
        setCharacterDirection(dir);
        setIsMoving(true);
    };

    const onMoveComplete = (dir: Direction) => {
        setCharacterPos(getNextTile(characterPos, mapSideLength, dir));
        setIsMoving(false);
    };

    return (
        <div className={styles.container}>
            <BackgroundLayer
                characterPos={characterPos}
                map={map} 
                onMoveStart={onMoveStart} 
                onMoveComplete={onMoveComplete} 
            />
            <CharacterLayer 
                direction={characterDirection} 
                moving={isMoving} 
                sprites={characterSprites}
            />
        </div>
    )
};