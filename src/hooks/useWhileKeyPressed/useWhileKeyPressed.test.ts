import { renderHook } from "@testing-library/react";
import { useWhileKeyPressed } from "./useWhileKeyPressed";
import userEvent from "@testing-library/user-event";

describe("useWhileKeyPressed", () => {
    beforeAll(() => {
        // Testing-library user-events don't work with vi advanceTimers
        // Seems to be developed against jest - need to trick it with this mock
        // https://github.com/testing-library/user-event/issues/1115
        vi.stubGlobal("jest", {
            advanceTimersByTime: vi.advanceTimersByTime.bind(vi) 
        });
    });
    
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    it('should call callback while key pressed', async () => {
        const cb = vi.fn();
        const interval = 10;
        const key = 'a';

        renderHook(() => useWhileKeyPressed(key, cb, interval));

        const user = userEvent.setup({
            advanceTimers: vi.advanceTimersByTime.bind(vi)
        });

        // Press and hold
        await user.keyboard(`{${key}>}`);

        vi.advanceTimersByTime(interval * 5);

        // Release key
        await user.keyboard(`{/${key}}`);

        expect(cb).toHaveBeenCalledTimes(5);
    })
});