/**
 * Splits an array in to arrays of size "chunkSize"
 * Surprised there isn't an array method for this, but what can you do!
*/
export const chunkArray = (arr: any[], chunkSize: number) => {
    const isWholeNumberOfChunks = arr.length % chunkSize === 0;
    const numberOfChunks = Math.floor(arr.length / chunkSize) + (isWholeNumberOfChunks ? 0 : 1);
    const chunks = [];

    for (let i = 0; i < numberOfChunks; i++) {
        const startIndex = chunkSize * i;
        const endIndex = chunkSize * (i + 1);

        const chunk = arr.slice(startIndex, endIndex);
        chunks.push(chunk);
    }

    return chunks;
}