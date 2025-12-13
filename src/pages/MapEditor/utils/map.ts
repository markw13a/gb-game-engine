export const appendColumn = (arr: any[], colLength: number) => {
    const col = new Array(colLength).fill(null);
    const out = arr.concat(col);
    
    return out;
}

export const appendRow = (arr: any[], length: number) => {
    const originalArrLength = arr.length;
    // 40 x 40 array
    // Start from end of array, 
    const row = new Array(length).fill(null);
    return arr.concat(row);
}