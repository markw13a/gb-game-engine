/**
 * Splits an array in to arrays of size "chunkSize"
 * Surprised there isn't an array method for this, but what can you do!
*/
export const chunkArray = (arr: any[], chunkSize: number) => {
    const numberOfChunks = Math.floor(arr.length / chunkSize) + 1;
    const chunks = [];

    for (let i = 0; i < numberOfChunks; i += 1) {
        const startIndex = chunkSize * i;
        const endIndex = chunkSize * (i + 1);

        const chunk = arr.slice(startIndex, endIndex);
        chunks.push(chunk);
    }

    return chunks;
}