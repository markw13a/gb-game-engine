import type { GameObject } from "@/lib/types/object";

// These objects are tightly coupled with their maps because of the position fields
// Maybe they should live together too?
export const objects: GameObject[] = [
    {
        width: 2,
        height: 2,
        position: 300,
        occupiedTiles: [300, 301, 340, 341],
        sprite: '/sprites/objects/pokeball.png',
        event: 'item'
    }
];
