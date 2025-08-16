export type TileType = 'grass' | 'tall-grass';

export type Tile = {
    type: TileType;
    sprite: string;
    isPassable: boolean;
}