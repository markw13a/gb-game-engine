import styles from "./CharacterLayer.module.css";

import idleUp from "../../assets/red/static/up.svg";
import idleDown from "../../assets/red/static/down.svg";
import idleLeft from "../../assets/red/static/left.svg";
import idleRight from "../../assets/red/static/right.svg";

import movingUp from "../../assets/red/moving/up.gif";
import movingDown from "../../assets/red/moving/down.gif";
import movingLeft from "../../assets/red/moving/left.gif";
import movingRight from "../../assets/red/moving/right.gif";
import type { Direction } from "@/lib/types/direction";

type SpriteMap = {
	idle: Record<Direction, string>;
	moving: Record<Direction, string>;
};

type CharacterLayerProps = {
	direction: Direction;
	moving: boolean;
};

const sprites: SpriteMap = {
	moving: {
		up: movingUp,
		down: movingDown,
		left: movingLeft,
		right: movingRight,
	},
	idle: { up: idleUp, down: idleDown, left: idleLeft, right: idleRight },
};

export const CharacterLayer = ({ direction, moving }: CharacterLayerProps) => {
	const sprite = sprites[moving ? "moving" : "idle"][direction];
	const ariaLabel = `Character is ${moving ? "moving" : "idle"} and facing ${direction}`;

	return (
		<div className={styles.container}>
			<div className={styles.characterContainer}>
				<img
					alt="character"
					aria-label={ariaLabel}
					className={styles.character}
					data-testid="character"
					src={sprite}
				/>
			</div>
		</div>
	);
};
