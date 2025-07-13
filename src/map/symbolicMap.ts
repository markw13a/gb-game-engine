export type MapData = {
    type: 'boundary' | 'grassland';
    isPassable: boolean;
    color: string;
}

const rawMap = 
 `
  GGG
  GGG
  GGG
`;

export const map = rawMap.replace(/\s+/g, '');

// TODO: Delete this!
window.testMap = map;

export const getDataForSymbol = (symbol: string): MapData => {
    switch (symbol) {
        case 'G':
            return { type: 'grassland', color: 'white', isPassable: true }
        default: 
            return { type: 'boundary', color: 'black', isPassable: false }
    }
};

export const getColorForPosition = (i: number) => {
    const symbol = map[i];

    return getDataForSymbol(symbol)?.color;
};