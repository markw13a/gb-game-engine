import type { GameObject } from "@/lib/types/object";

// HACK: Function would make more sense rather than tacking this on as/when
const BASE_URL = import.meta.env.BASE_URL

// These objects are tightly coupled with their maps because of the position fields
// Maybe they should live together too?
export const objects: GameObject[] = [
	{
		id: "1",
		width: 2,
		height: 2,
		position: 300,
		occupiedTiles: [300, 301, 340, 341],
		sprite: `${BASE_URL}/sprites/objects/pokeball.png`,
	},
];
