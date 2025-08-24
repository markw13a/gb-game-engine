export type Tile<T = string> = {
	type: T;
	label: string;
	sprite: string;
	isPassable: boolean;
};

export type Map<T = string> = Tile<T>[];
