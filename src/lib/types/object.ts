export type GameObject = {
	id: string;
	width: number;
	height: number;
	position: number; // Tile occupied by object, will be top-left tile if object spans multiple tiles
	occupiedTiles: number[]; // All tiles occupied by the object
	sprite: string;
};
