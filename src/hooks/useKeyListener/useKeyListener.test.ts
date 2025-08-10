import { useKeyListener } from "./useKeyListener";

import { renderHook } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';

describe("useKeyListener", () => {
    it('should call callbacks', async () => {
        const keyDownMock = vi.fn();
        const keyUpMock = vi.fn();

        renderHook(() => useKeyListener('a', keyDownMock, keyUpMock));

        await userEvent.keyboard('a');

        expect(keyDownMock).toHaveBeenCalled();
    });

    // TODO: Feels like a flaky test, can't guarantee repeat events start firing before we run the check at the end
    it('should ignore repeatedly', async () => {
        const keyDownMock = vi.fn();
        const keyUpMock = vi.fn();

        renderHook(() => useKeyListener('a', keyDownMock, keyUpMock, { ignoreRepeat: true }));

        await userEvent.keyboard('{a>}');

        expect(keyDownMock).toHaveBeenCalledOnce();
    })
});