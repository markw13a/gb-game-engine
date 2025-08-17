import { decodeMap, getMapSideLength, getNextTile } from "./symbolicMap";

describe("symbolicMap", () => {
    it('should return next position', () => {
        const mapSideLength = 3;
        const startingPos = 4;

        const leftPos = getNextTile(startingPos, mapSideLength, 'left');
        const rightPos = getNextTile(startingPos, mapSideLength, 'right');
        const upPos = getNextTile(startingPos, mapSideLength, 'up');
        const downPos = getNextTile(startingPos, mapSideLength, 'down');

        expect(leftPos).toEqual(1);
        expect(rightPos).toEqual(7);
        expect(upPos).toEqual(3);
        expect(downPos).toEqual(5);
    })

    it('should return map side length', () => {
        const map = "GGGG";
        const decoded = decodeMap(map);
        const sideLength = getMapSideLength(decoded);
        expect(sideLength).toEqual(2);
    })
});