import { useKeyListener } from "./useKeyListener";

import { renderHook } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';

describe("useKeyListener", () => {
    it('should call callbacks', async () => {
        const moveLeftMock = vi.fn();
        const moveRightMock = vi.fn();
        const moveUpMock = vi.fn();
    
        const keyMap = { 
            "a": moveLeftMock, 
            "d": moveRightMock, 
            "w": moveUpMock 
        };

        renderHook(() => useKeyListener(keyMap));

        await userEvent.keyboard('a');
        await userEvent.keyboard('d');

        expect(moveLeftMock).toHaveBeenCalled();
        expect(moveRightMock).toHaveBeenCalled();
        expect(moveUpMock).not.toHaveBeenCalled();
    });
});