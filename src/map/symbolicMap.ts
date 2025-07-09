export type MapData = {
    type: 'boundary' | 'grassland',
    color: string;
}

const rawMap = 
 `BBBBBB
  BGGGGB
  BGGGGB
  BGGGGB
  BGGGGB
  BBBBBB
`;

export const map = rawMap.replace(/\s+/g, '');

export const getDataForSymbol = (symbol: string) => {
    switch (symbol) {
        case 'B':
            return { type: 'boundary', color: 'black' }
        case 'G':
            return { type: 'grassland', color: 'white' }
        default: 
            throw new Error(`Unrecognised symbol: ${symbol}`);
    }
};

export const getColorForPosition = (i: number) => {
    const symbol = map[i];

    return getDataForSymbol(symbol)?.color;
};