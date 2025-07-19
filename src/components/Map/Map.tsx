import { useState } from "react";
import { CharacterLayer } from "./CharacterLayer";
import type { Direction, Map as MapType } from "../../types/types";
import { getMapSideLength, getNextTile } from "../../map/symbolicMap";
import { BackgroundLayer } from "./BackgroundLayer";

type MapProps = {
    map: MapType;
}

export const Map = ({ map }: MapProps) => {
    const [characterPos, setCharacterPos] = useState(17);
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
        <div>
            <BackgroundLayer
                characterPos={characterPos}
                map={map} 
                onMoveStart={onMoveStart} 
                onMoveComplete={onMoveComplete} 
            />
            <CharacterLayer 
                direction={characterDirection} 
                moving={isMoving} 
            />
        </div>
    )
};