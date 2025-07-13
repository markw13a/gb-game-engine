/**
 * Returns an array of numbers from -max to max
 * Example output:
 * max = 5; out = [-2, -1, 0, 1, 2]
 * Useful in calculating indices for adjacent rows/columns in a max x max size grid 
 * @param max Upper and lower bound of range
 */
export const calculateRange = (max: number) => {
    const lowerBound = -max;
    const range: number[] = [];

    if (max <= 0) {
        throw new Error(`calculateRange: unsupported value (${max})`);
    }

    for (let i = 0; i < max; i++) {
        range.push(lowerBound + i);
    }

    range.push(0);

    for (let i = 0; i < max; i++) {
        range.push(i + 1);
    }

    return range;
};