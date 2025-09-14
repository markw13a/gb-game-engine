import type { GameObject } from "@/lib/types/object";

export const generateGameObject = (
	overrides: Partial<GameObject> = {},
): GameObject => ({
	id: "1",
	width: 0,
	height: 0,
	position: 0,
	occupiedTiles: [],
	sprite: "",
	...overrides,
});
