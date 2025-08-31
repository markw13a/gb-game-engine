export const chunkText = (text: string, limit: number) => {
    if (text.length <= limit) {
        return [text];
    }

    const words = text.split(' ');
    const out = [];
    let currentLine = "";

    for (const word of words) {
        const isFirstWord = currentLine.length === 0;
        const nextLine = isFirstWord ? word : `${currentLine} ${word}`;

        if (nextLine.length > limit) {
            out.push(currentLine);
            currentLine = word;
        } else {
            currentLine = nextLine;
        }
    }

    out.push(currentLine);

    return out;
}