import type { Direction, SpriteMap } from "../../../../types/types";

import styles from "./CharacterLayer.module.css";

type CharacterLayerProps = {
    direction: Direction;
    moving: boolean;
    sprites: SpriteMap;
};

export const CharacterLayer = ({ direction, moving, sprites }: CharacterLayerProps) => {
    const sprite = sprites[moving ? 'moving' : 'idle'][direction];

    return (
        <div className={styles.container}>
            <div 
                className={styles.character}
                data-testid="character" 
                style={{
                    backgroundImage: `url('${sprite}')`
                }}
            />
        </div>
    );
};