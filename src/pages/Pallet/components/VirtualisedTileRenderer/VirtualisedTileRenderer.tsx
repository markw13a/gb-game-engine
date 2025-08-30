import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../Tile/Tile";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useScroll } from "../../../../lib/hooks/useScroll";
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map } from "../../../../types/map";
import type { Direction } from "../../../../types/sprite";
import { getObjectWithinTiles, getObjectAtTile } from "@/lib/utils/object";
import type { GameObject } from "@/lib/types/object";
import { calculateIndices, calculateTiles, getNextTile, getSideLength } from "@/lib/utils/grid";

type VirtualisedTileRendererProps<T> = {
	characterPos: number;
	map: Map;
	objects: T[];
	tileSize: number;
	viewAreaSize?: number;
	onMoveStart: (dir: Direction) => void;
	onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = <T extends GameObject = GameObject>({
	characterPos,
	map,
	objects,
	tileSize,
	viewAreaSize = 5,
	onMoveStart,
	onMoveComplete,
}: VirtualisedTileRendererProps<T>) => {
	const { scrollContainerRef, scroll, isScrollingRef } = useScroll();
	const callbackRef = useRef(onMoveComplete);

	const mapSideLength = getSideLength(map);

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
				(tile) => map[tile]?.isPassable && !getObjectWithinTiles(tile, objects),
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

	const tileIndices = calculateIndices(viewAreaSize, mapSideLength, characterPos);
	const tilesData = tileIndices.map((i) => map[i]);
	const objectsData = tileIndices.map((tile) => getObjectAtTile(tile, objects));

	// Check if object present in rendered tile - get object data
	const tilesContainerStyles = {
		gridTemplateColumns: `repeat(${viewAreaSize}, ${tileSize}px)`,
		gridTemplateRows: `repeat(${viewAreaSize}, ${tileSize}px)`,
		maxHeight: `${tileSize * (viewAreaSize - 4)}px`,
		maxWidth: `${tileSize * (viewAreaSize - 4)}px`,
	};


	return (
		<div className={styles.container} ref={scrollContainerRef}>
			<div className={styles.tilesContainer} style={tilesContainerStyles}>
				{tilesData.map((tile, i) => (
					<Tile key={i} sprite={tile.sprite} />
				))}
			</div>
			<div className={styles.objectsContainer} style={tilesContainerStyles}>
				{objectsData.map((obj, i) => (
					// Can't we just use grid features? No need for this nonsense with making tiles bigger
					<Tile key={i} sprite={obj?.sprite ?? null} width={obj?.width} height={obj?.height} />
				))}
			</div>
		</div>
	);
};
