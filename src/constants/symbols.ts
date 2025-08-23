import type { Tile } from "../types/map";

export const TILES: Record<string, Tile> = {
	G: {
		type: "G",
		label: "Grass",
		sprite: "/sprites/world/grass-1.png",
		isPassable: true,
	},
	g: {
		type: "g",
		label: "Tall grass",
		sprite: "/sprites/world/tall-grass-1.png",
		isPassable: true,
	},
	p: {
		type: "p",
		label: "Path",
		sprite: "/sprites/world/path.png",
		isPassable: true,
	},
	B: {
		type: "B",
		label: "Bollard-1",
		sprite: "/sprites/world/bollard-1.png",
		isPassable: false,
	},
	b: {
		type: "b",
		label: "Bollard-2",
		sprite: "/sprites/world/bollard-2.png",
		isPassable: false,
	},
	N: {
		type: "N",
		label: "Bollard-3",
		sprite: "/sprites/world/bollard-3.png",
		isPassable: false,
	},
	n: {
		type: "n",
		label: "Bollard-4",
		sprite: "/sprites/world/bollard-4.png",
		isPassable: false,
	},
	d: {
		type: "d",
		label: "Dirt",
		sprite: "/sprites/world/dirt.png",
		isPassable: true,
	},
	R: {
		type: "R",
		label: "Railing-1",
		sprite: "/sprites/world/railing-1.png",
		isPassable: false,
	},
	r: {
		type: "r",
		label: "Railing-2",
		sprite: "/sprites/world/railing-2.png",
		isPassable: false,
	},
} as const;

export const SYMBOLS = Object.keys(TILES);

export const TILE_DATA = Object.values(TILES);
