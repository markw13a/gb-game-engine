import type { PalletGameObject } from "../types/PalletGameObject";

// These objects are tightly coupled with their maps because of the position fields
// Maybe they should live together too?
export const objects: PalletGameObject[] = [
	{
		id: "1",
		width: 2,
		height: 2,
		position: 300,
		occupiedTiles: [300, 301, 340, 341],
		sprite: "/sprites/objects/pokeball.png",
		events: ["remove-item"],
	},
];
