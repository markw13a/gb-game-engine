import type { Map, Tile } from "@/types/map";

export const generateTile = (overrides: Partial<Tile> = {}): Tile => ({
	type: "G",
	label: "test-tile",
	sprite: "/sprite/img-1.png",
	isPassable: true,
	...overrides,
});

export const generateMap = (sideLength: number): Map =>
	Array.from({ length: sideLength ** 2 }).map(() => generateTile());
