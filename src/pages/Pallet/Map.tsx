import { useMemo, useState } from "react";
import { CharacterLayer } from "./components/CharacterLayer/CharacterLayer";
import type { Map as MapType } from "../../types/map";
import { getMapSideLength } from "../../utils/symbolicMap/symbolicMap";
import { VirtualisedTileRenderer } from "./components/VirtualisedTileRenderer/VirtualisedTileRenderer";

import styles from "./Map.module.css";
import { useKeyListener } from "../../hooks/useKeyListener/useKeyListener";
import type { Direction, SpriteMap } from "../../types/sprite";
import { getNextTile } from "@/lib/utils/tile";
import {
	dispatchObjectInteractionEvent,
	getObjectAtTile,
} from "@/lib/utils/object";
import { objects } from "./constants/objects";

type MapProps = {
	map: MapType;
};

const characterSprites: SpriteMap = {
	moving: {
		left: "/clefairy/moving/left.gif",
		right: "/clefairy/moving/right.gif",
		up: "/clefairy/moving/up.gif",
		down: "/clefairy/moving/down.gif",
	},
	idle: {
		left: "/clefairy/static/left.png",
		right: "/clefairy/static/right.png",
		up: "/clefairy/static/up.png",
		down: "/clefairy/static/down.png",
	},
};

export const Map = ({ map }: MapProps) => {
	// Represents "top-right" tile which character sits on
	const [characterPos, setCharacterPos] = useState(292);
	const [isMoving, setIsMoving] = useState(false);
	const [characterDirection, setCharacterDirection] =
		useState<Direction>("down");

	const mapSideLength = getMapSideLength(map);

	const onMoveComplete = (dir: Direction) =>
		setCharacterPos(getNextTile(characterPos, mapSideLength, dir, 2));

	const onKeyPressed = () => setIsMoving(true);
	// TODO: Need to check that key released matches the direction! Creates bug where gif stops looping even though we're still moving
	// Maybe not the most elegant solution to fix it here, consider how to fix later
	const onKeyReleased = () => setIsMoving(false);
	const options = useMemo(() => ({ ignoreRepeat: true }), []);

	const onInteractionKeyPressed = () => {
		const targetTile = getNextTile(
			characterPos,
			mapSideLength,
			characterDirection,
		);
		const targetObject = getObjectAtTile(targetTile, objects);

		if (targetObject) {
			dispatchObjectInteractionEvent(targetObject);
		}
	};

	useKeyListener("w", onKeyPressed, onKeyReleased, options);
	useKeyListener("a", onKeyPressed, onKeyReleased, options);
	useKeyListener("s", onKeyPressed, onKeyReleased, options);
	useKeyListener("d", onKeyPressed, onKeyReleased, options);
	useKeyListener("e", onInteractionKeyPressed, () => {}, options);

	return (
		<div className={styles.container}>
			<VirtualisedTileRenderer
				map={map}
				objects={objects}
				characterPos={characterPos}
				onMoveStart={setCharacterDirection}
				onMoveComplete={onMoveComplete}
				viewAreaSize={13}
			/>
			<CharacterLayer
				moving={isMoving}
				sprites={characterSprites}
				direction={characterDirection}
			/>
		</div>
	);
};
