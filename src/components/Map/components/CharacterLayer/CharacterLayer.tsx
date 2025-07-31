import type { Direction } from "../../../../types/types";

import styles from "./CharacterLayer.module.css";

type CharacterLayerProps = {
    direction: Direction;
    moving: boolean;
};

export const CharacterLayer = ({ direction, moving }: CharacterLayerProps) => {
    // Render character sprite in centre
    // Update sprite direction, etc.
    // Display animation when appropriate

    // Communicate via events?
    // Would need to make state available further up tree otherwise

    return (
        <div className={styles.container}>
            <div 
                className={styles.character} 
                data-sprite={direction} 
                data-moving={moving} 
                data-testid="character" 
            />
        </div>
    );
};