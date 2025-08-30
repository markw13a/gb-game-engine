import type { GameObject } from "@/lib/types/object";

export const getObjectAtTile = <T extends GameObject>(
	tile: number,
	objects: T[],
): T | null =>
	objects.find((object) => object.position === tile) ?? null;

export const getObjectWithinTiles = <T extends GameObject>(tile: number, objects: T[]): T | null => objects.find(obj => obj.occupiedTiles.includes(tile)) ?? null;

export const dispatchObjectInteractionEvent = <T extends GameObject>(
	object: T,
) => document.dispatchEvent(new CustomEvent(object.event));
