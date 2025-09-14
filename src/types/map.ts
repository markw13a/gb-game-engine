// TODO: Either delete this file or move it to /Pallet
export type Tile = {
	type: Symbol;
	label: string;
	sprite: string;
	isPassable: boolean;
};

export type Map = Tile[];

export type Symbol = "G" | "g" | "p" | "B" | "b" | "N" | "n" | "d" | "R" | "r";
