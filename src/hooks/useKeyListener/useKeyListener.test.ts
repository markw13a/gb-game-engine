import { useKeyListener } from "./useKeyListener";

import { renderHook } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';

describe("useKeyListener", () => {
    it('should call callbacks', async () => {
        const keyDownLeftMock = vi.fn();
        const keyDownRightMock = vi.fn();
        const keyDownUpMock = vi.fn();

        const keyUpLeftMock = vi.fn();
        const keyUpRightMock = vi.fn();
        const keyUpUpMock = vi.fn();

        const keyMap = { 
            "a": {
                onKeyPressed: keyDownLeftMock,
                onKeyReleased: keyUpLeftMock
            }, 
            "d": {
                onKeyPressed: keyDownRightMock,
                onKeyReleased: keyUpRightMock
            }, 
            "w": {
                onKeyPressed: keyDownUpMock,
                onKeyReleased: keyUpUpMock
            } 
        };

        renderHook(() => useKeyListener(keyMap));

        await userEvent.keyboard('a');
        await userEvent.keyboard('d');

        expect(keyDownLeftMock).toHaveBeenCalled();
        expect(keyDownRightMock).toHaveBeenCalled();
        expect(keyUpLeftMock).toHaveBeenCalled();
        expect(keyUpRightMock).toHaveBeenCalled();

        expect(keyDownUpMock).not.toHaveBeenCalled();
        expect(keyUpUpMock).not.toHaveBeenCalled();
    });
});