import styles from "./VirtualisedTileRenderer.module.css";
import { Tile } from "../Tile/Tile";

import {
	getMapSideLength,
	getNextTile,
	getVisibleTiles,
} from "../../../../utils/symbolicMap/symbolicMap";
import { useCallback, useLayoutEffect } from "react";
import { useScroll } from "../../../../hooks/useScroll";
import { useWhileKeyPressed } from "../../../../hooks/useWhileKeyPressed/useWhileKeyPressed";
import type { Map } from "../../../../types/map";
import type { Direction } from "../../../../types/sprite";

type VirtualisedTileRendererProps = {
	characterPos: number;
	map: Map;
	tileSize?: number;
	viewAreaSize?: number;
	onMoveStart: (dir: Direction) => void;
	onMoveComplete: (dir: Direction) => void;
};

// Responsible for rendering grid, animating background scroll, rendering items + NPCs
export const VirtualisedTileRenderer = ({
	characterPos,
	map,
	tileSize = 50,
	viewAreaSize = 5,
	onMoveStart,
	onMoveComplete,
}: VirtualisedTileRendererProps) => {
	const { scrollContainerRef, scroll, isScrollingRef } = useScroll();

	const mapSideLength = getMapSideLength(map);

	const move = useCallback(
		async (dir: Direction) => {
			const nextCharacterPos = getNextTile(characterPos, mapSideLength, dir, 2);
			// If character pos is the top-right tile which the character occupies, we need to check that all four tiles the character will occupy don't contain any impassable tiles
			const nextCharacterPosLeft = getNextTile(nextCharacterPos, mapSideLength, 'left');
			const nextCharacterPosBottomRight = getNextTile(nextCharacterPos, mapSideLength, 'down');
			const nextCharacterPosBottomLeft = getNextTile(nextCharacterPosBottomRight, mapSideLength, 'left')
			
			const nextCharacterSquare = [
				nextCharacterPosLeft, nextCharacterPos,
				nextCharacterPosBottomLeft, nextCharacterPosBottomRight
			];

			const isPassable = nextCharacterSquare.every(square => map[square]?.isPassable); 

			if (!isPassable || isScrollingRef.current) {
				return;
			}

			onMoveStart(dir);
			await scroll(dir);
			onMoveComplete(dir);
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

	const tileData = getVisibleTiles(characterPos, viewAreaSize, mapSideLength);

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
