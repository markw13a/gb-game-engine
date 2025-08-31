import { chunkText } from "./dialog"

describe('dialog', () => {
    it('should not chunk text that does not exceed the maximum', () => {
        const result = chunkText("I'm the fishing guru!", 25);
        expect(result).toEqual(["I'm the fishing guru!"]);
    })

    it('should chunk text that exceeds the maximum', () => {
        const result = chunkText("I'm the fishing guru!", 20);
        expect(result).toEqual(["I'm the fishing", "guru!"]);
    })
})