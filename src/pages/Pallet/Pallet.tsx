import { useMemo, useState } from "react";
import { CharacterLayer } from "./components/CharacterLayer/CharacterLayer";
import { VirtualisedTileRenderer } from "./components/VirtualisedTileRenderer/VirtualisedTileRenderer";

import styles from "./Pallet.module.css";
import { useKeyListener } from "../../hooks/useKeyListener/useKeyListener";

import { getObjectWithinTiles } from "@/lib/utils/object";
import { TILE_SIZE } from "./constants/tile";
import { getNextTile, getSideLength } from "@/lib/utils/grid";
import { useGameStateContext } from "./providers/GameStateProvider";
import { Dialog } from "@/lib/components/Dialog/Dialog";
import type { Direction } from "@/lib/types/direction";

import { ScreenWipe } from "./components/ScreenWipe/ScreenWipe";
import { map } from "./constants/map";
import { warpPoints } from "./constants/warpPoints";
import { ConsoleShell } from "./components/ConsoleShell/ConsoleShell";

export const Pallet = () => {
	// Represents "top-right" tile which character sits on
	const [characterPos, setCharacterPos] = useState(292);
	const [isMoving, setIsMoving] = useState(false);
	const [characterDirection, setCharacterDirection] =
		useState<Direction>("down");
	const [dialog, setDialog] = useState("");
	const [isScreenWipeActive, setIsScreenWipeActive] = useState(false);
	const {
		state: { objects },
		dispatch,
	} = useGameStateContext();

	const mapSideLength = getSideLength(map);

	const onWarpPoint = (tile: number) => {
		setIsScreenWipeActive(true);
		setTimeout(() => {
			setIsScreenWipeActive(false);
			setCharacterPos(tile);
		}, 500);
	};

	const onMoveComplete = (nextCharacterPos: number) =>
		setCharacterPos(nextCharacterPos);

	const onKeyPressed = () => {
		if (dialog) {
			return;
		}

		setIsMoving(true);
	};
	// TODO: Need to check that key released matches the direction! Creates bug where gif stops looping even though we're still moving
	// Maybe not the most elegant solution to fix it here, consider how to fix later
	const onKeyReleased = () => setIsMoving(false);
	const options = useMemo(() => ({ ignoreRepeat: true }), []);

	const onInteractionKeyPressed = () => {
		const targetTile = getNextTile(
			characterPos,
			mapSideLength,
			characterDirection,
			characterDirection === "up" ? 1 : 2,
		);
		const targetObject = getObjectWithinTiles(targetTile, objects);

		if (targetObject) {
			dispatch({ type: "remove-item", payload: { id: targetObject.id } });
			setDialog("An interesting item was found!");
		}
	};

	useKeyListener("w", onKeyPressed, onKeyReleased, options);
	useKeyListener("a", onKeyPressed, onKeyReleased, options);
	useKeyListener("s", onKeyPressed, onKeyReleased, options);
	useKeyListener("d", onKeyPressed, onKeyReleased, options);
	useKeyListener("e", onInteractionKeyPressed, () => {}, options);

	return (
		<div className={styles.topLevelContainer}>
			<ConsoleShell>
				<div className={styles.container}>
					<VirtualisedTileRenderer
						characterPos={characterPos}
						map={map}
						objects={objects}
						warpPoints={warpPoints}
						onWarpPoint={onWarpPoint}
						onMoveStart={setCharacterDirection}
						onMoveComplete={onMoveComplete}
						tileSize={TILE_SIZE}
						disableMovement={!!dialog || isScreenWipeActive}
						viewAreaSize={13}
					/>
					<CharacterLayer moving={isMoving} direction={characterDirection} />
					{!!dialog && (
						<Dialog
							text={dialog}
							maxCharacters={20}
							onDialogEnded={() => setDialog("")}
							interactionKey="e"
							downKey="s"
							upKey="w"
						/>
					)}
					<ScreenWipe isVisible={isScreenWipeActive} />
					{/* Maybe these components should be controlled via context, and moved out of Pallet */}
					{/* Pallet opens these by dispatching an event? */}
					{/* Menu + its Modals (for Pokemon + Pokedex) */}
					{/* Battle-scene (just a modal!) updates pokemon health + stats via context */}
				</div>
			</ConsoleShell>
		</div>
	);
};
