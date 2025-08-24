import type { GameObject } from "@/lib/types/object";

export const getObjectAtTile = <T extends GameObject>(
	tile: number,
	objects: T[],
): T | undefined =>
	objects.find((object) => object.occupiedTiles.includes(tile));

export const dispatchObjectInteractionEvent = <T extends GameObject>(
	object: T,
) => document.dispatchEvent(new CustomEvent(object.event));
