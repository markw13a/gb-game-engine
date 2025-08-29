import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../Tile/Tile";

import { getMapSideLength } from "../../../../utils/symbolicMap/symbolicMap";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useScroll } from "../../../../lib/hooks/useScroll";
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map } from "../../../../types/map";
import type { Direction } from "../../../../types/sprite";
import { getNextTile, getTilesAroundPos } from "@/lib/utils/tile";
import { getObjectAtTile } from "@/lib/utils/object";
import type { GameObject } from "@/lib/types/object";
import { calculateTiles } from "@/lib/utils/grid";

type VirtualisedTileRendererProps<T> = {
	characterPos: number;
	map: Map;
	objects: T[];
	tileSize?: number;
	viewAreaSize?: number;
	onMoveStart: (dir: Direction) => void;
	onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = <T extends GameObject = GameObject>({
	characterPos,
	map,
	objects,
	tileSize = 50,
	viewAreaSize = 5,
	onMoveStart,
	onMoveComplete,
}: VirtualisedTileRendererProps<T>) => {
	const { scrollContainerRef, scroll, isScrollingRef } = useScroll();
	const callbackRef = useRef(onMoveComplete);

	const mapSideLength = getMapSideLength(map);

	useEffect(() => {
		callbackRef.current = onMoveComplete;
	}, [onMoveComplete]);

	const move = useCallback(
		async (dir: Direction) => {
			const nextCharacterPos = getNextTile(characterPos, mapSideLength, dir, 2);
			const nextCharacterPosOccupiedTiles = calculateTiles(
				2,
				2,
				mapSideLength,
				nextCharacterPos,
			);

			const isPassable = nextCharacterPosOccupiedTiles.every(
				(tile) => map[tile]?.isPassable && !getObjectAtTile(tile, objects),
			);

			if (!isPassable || isScrollingRef.current) {
				return;
			}

			onMoveStart(dir);
			await scroll(dir);
			callbackRef.current(dir);
		},
		[onMoveComplete, characterPos],
	);

	// TODO: Would like to move this out of this component
	useWhileKeyPressed("a", () => move("left"), 10);
	useWhileKeyPressed("d", () => move("right"), 10);
	useWhileKeyPressed("w", () => move("up"), 10);
	useWhileKeyPressed("s", () => move("down"), 10);

	// Our movement animation is based on rendering additional layers of hidden tiles
	// Around the visible section. When rendering, we need to scroll to the centre of this container
	useLayoutEffect(() => {
		if (scrollContainerRef.current === null) return;
		// Want there to be one unseen tile to the left and right of the visible area
		scrollContainerRef.current.scrollLeft = tileSize * 2;
		scrollContainerRef.current.scrollTop = tileSize * 2;
	}, [characterPos]);

	const tileData = getTilesAroundPos(
		characterPos,
		viewAreaSize,
		mapSideLength,
		map,
	);

	return (
		<div
			className={styles.container}
			style={{
				gridTemplateColumns: `repeat(${viewAreaSize}, ${tileSize}px)`,
				gridTemplateRows: `repeat(${viewAreaSize}, ${tileSize}px)`,
				maxHeight: `${tileSize * (viewAreaSize - 4)}px`,
				maxWidth: `${tileSize * (viewAreaSize - 4)}px`,
			}}
			ref={scrollContainerRef}
		>
			{tileData.map((tile, i) => (
				<Tile key={i} sprite={tile.sprite} size={tileSize} />
			))}
		</div>
	);
};
