// TODO: would be nice to type more strictly
// I think extending GameObject and altering GameObjectEvent for your project is the best we'll do
export type GameObjectEvent = string;

export type GameObject = {
	width: number;
	height: number;
	position: number; // Tile occupied by object, will be top-left tile if object spans multiple tiles
	occupiedTiles: number[]; // All tiles occupied by the object
	sprite: string;
	event: GameObjectEvent; // Name of event dispatched if object interacted with
};
