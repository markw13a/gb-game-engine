// TODO: Code in this file isn't really testable -- functions depend on in-scope values
import { TILES } from "../../constants/symbols";
import type { Map, Tile } from "../../types/map";

const rawMap =
	"BNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnBNBNddddddddddddddddddddddddddddddddBNBNbnbnddddddddddddddddddddddddddddddddbnbnBNBNpGppGGGGpGppppGppGppGppGppddddddBNBNbnbnppppGGGGppppppppppppppppppddddddbnbnBNBNpppGGGGGpppGpppGpppGpppppGddddddBNBNbnbnppppGGGGppppppppppppppppppddddddbnbnBNBNpGggggggpGppGGRrddddpppGppddddddBNBNbnbnppggggggppppGGRrddddppppppddddddbnbnBNBNppggggggpppGGGRrddddpppppGddddddBNBNbnbnppggggggpGppGGRrddddppppppddddddbnbnBNBNpGggggggppppGGRrddddpppGppddddddBNBNbnbnppggggggpppGGGRrddddpppppGddddddbnbnBNBNppggggggppppGGRrddddppppppddddddBNBNbnbnppppGppppGppppppppGpppppppGGGGGGbnbnBNBNpGppppppppppGppppppppppGppGGGGGGBNBNbnbnppppppppppppppppppppppppppGGGGGGbnbnBNBNpppGpppGppGppppGppppGpppppGGGGGGBNBNbnbnpppppppppppppppgggggggGGRrddddGGbnbnBNBNpGppGGGGpppppppgggggggGGRrddddGGBNBNbnbnppppGGGGpppppGpgggggggGGRrddddGGbnbnBNBNpppGGGGGpppppppgggggggGGRrddddGGBNBNbnbnppppGGGGpppppppgggggggGGRrddddGGbnbnBNBNpGggggggpppGpppgggggggGGRrddddGGBNBNbnbnppggggggpppppppgggggggGGRrddddGGbnbnBNBNppggggggpppppppgggggggGGRrddddGGBNBNbnbnppggggggpppppGpgggggggGGRrddddGGbnbnBNBNpGggggggpppppppgggggggGGGGGGGGGGBNBNbnbnppggggggpppppppgggggggGGGGGGGGGGbnbnBNBNppggggggpppGppppppppppGGGGGGGGGGBNBNbnbnpGppGpppppppppppppppppGGGGGGGGGGbnbnBNBNddddddddddddddddddddddddddddddddBNBNbnbnddddddddddddddddddddddddddddddddbnbnBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNBNbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbnbn";

export const getDataForSymbol = (symbol: string): Tile => {
	const data = TILES[symbol];

	if (!data) {
		throw new Error(`Unrecognised symbol: ${symbol}`);
	}

	return data;
};

export const decodeMap = (map: string): Map =>
	map.split("").map((char) => getDataForSymbol(char));

export const map = decodeMap(rawMap.replace(/\s+/g, ""));

/**
 * Returns n where map represents an n x n grid
 * (e.g map.length = 9 -> n = 3)
 */
export const getMapSideLength = (map: Map) => Math.sqrt(map.length);
