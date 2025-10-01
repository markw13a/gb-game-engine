// TODO: Duplicate type from lib?
export type Direction = "left" | "right" | "up" | "down";

export type SpriteMap = {
	idle: Record<Direction, string>;
	moving: Record<Direction, string>;
};
