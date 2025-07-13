import { calculateRange } from "./calculateRange";

describe('calculateRange', () => {
    it('should calculate short range', () => {
        const range = calculateRange(1);
        expect(range).toEqual([-1, 0, 1]);
    });

    it('should calculate longer range', () => {
        const range = calculateRange(5);
        expect(range).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
    });

    it('should reject negative number', () => {
        expect(() => calculateRange(-1)).toThrowError();
    });

    it('should reject zero', () => {
        expect(() => calculateRange(0)).toThrowError();
    });
});