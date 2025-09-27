import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../Tile/Tile";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useScroll } from "../../../../lib/hooks/useScroll";
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { GameMap, WarpPoint } from "../../../../types/map";
import type { Direction } from "../../../../types/sprite";
import {
	getObjectWithinTiles,
	getObjectAtTile,
	getIsObjectVisible,
} from "@/lib/utils/object";
import type { GameObject } from "@/lib/types/object";
import {
	calculateIndices,
	calculateTiles,
	getNextTile,
	getSideLength,
} from "@/lib/utils/grid";
import { ObjectTile } from "../Tile/ObjectTile";
import { getWarpPointAtTile } from "../../constants/warpPoints";

type VirtualisedTileRendererProps = {
	characterPos: number;
	map: GameMap;
	objects: GameObject[];
	warpPoints: WarpPoint[];
	tileSize: number;
	viewAreaSize?: number;
	disableMovement: boolean;
	onWarpPoint: (tile: number) => void;
	onMoveStart: (dir: Direction) => void;
	onMoveComplete: (tile: number) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = ({
	characterPos,
	map,
	objects,
	warpPoints,
	tileSize,
	viewAreaSize = 5,
	disableMovement,
	onWarpPoint,
	onMoveStart,
	onMoveComplete,
}: VirtualisedTileRendererProps) => {
	const { scrollContainerRef, scroll, isScrollingRef } = useScroll();
	const callbackRef = useRef(onMoveComplete);

	const mapSideLength = getSideLength(map);

	useEffect(() => {
		callbackRef.current = onMoveComplete;
	}, [onMoveComplete]);

	// TODO: Not sure I like how movement is spread across a few hooks + components
	const move = async (dir: Direction) => {
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
		const warpPoint = getWarpPointAtTile(nextCharacterPos, warpPoints);

		if (!isPassable || isScrollingRef.current || disableMovement) {
			return;
		}

		if (warpPoint) {
			onWarpPoint(warpPoint);
			return;
		}

		onMoveStart(dir);
		await scroll(dir);
		callbackRef.current(nextCharacterPos);
	};

	useWhileKeyPressed("a", () => move("left"), 10);
	useWhileKeyPressed("d", () => move("right"), 10);
	useWhileKeyPressed("w", () => move("up"), 10);
	useWhileKeyPressed("s", () => move("down"), 10);

	// Our movement animation is based on rendering additional layers of hidden tiles
	// Around the visible section. When rendering, we need to scroll to the centre of this container
	// biome-ignore lint/correctness/useExhaustiveDependencies: don't need ref, should be refreshed when char pos updates
	useLayoutEffect(() => {
		if (scrollContainerRef.current === null) return;
		// Want there to be one unseen tile to the left and right of the visible area
		scrollContainerRef.current.scrollLeft = tileSize * 2;
		scrollContainerRef.current.scrollTop = tileSize * 2;
	}, [characterPos, tileSize]);

	const tileIndices = calculateIndices(
		viewAreaSize,
		mapSideLength,
		characterPos,
	);
	const tilesData = tileIndices.map((i) => map[i]);
	// Second set of "tiles" for objects
	const objectsData = tileIndices.map((tile) => getObjectAtTile(tile, objects));
	// Only display an object if all of its occupied tiles are visible - prevents 'popping' effect
	const visibleObjects = objectsData.filter(
		(object) => object === null || getIsObjectVisible(tileIndices, object),
	);

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
					<Tile key={`tile-${i}`} sprite={tile.sprite} />
				))}
			</div>
			<div className={styles.objectsContainer} style={tilesContainerStyles}>
				{visibleObjects.map((obj, i) => (
					<ObjectTile
						tileSize={tileSize}
						sprite={obj?.sprite}
						width={obj?.width}
						height={obj?.height}
						key={`object-${i}`}
					/>
				))}
			</div>
		</div>
	);
};
