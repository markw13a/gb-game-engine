export type Tile = {
	type: Symbol;
	label: string;
	sprite: string;
	isPassable: boolean;
	// mapIndex: number; // Reference to tile position within rawMap
};

export type Map = Tile[];

export type Symbol = "G" | "g" | "p" | "B" | "b" | "N" | "n" | "d" | "R" | "r";
