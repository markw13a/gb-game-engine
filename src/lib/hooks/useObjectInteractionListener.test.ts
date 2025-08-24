import { renderHook } from "@testing-library/react";
import { useObjectInteractionListener } from "./useObjectInteractionListener";

describe("useObjectInteractionListener", () => {
	it("should call callback", async () => {
		const callbackMock = vi.fn();

		renderHook(() => useObjectInteractionListener("key", callbackMock));

		document.dispatchEvent(new CustomEvent("key"));

		expect(callbackMock).toHaveBeenCalled();
	});

	it("should not call callback", () => {
		const callbackMock = vi.fn();

		renderHook(() => useObjectInteractionListener("key", callbackMock));

		document.dispatchEvent(new CustomEvent("SomethingCompletelyDifferent"));

		expect(callbackMock).not.toHaveBeenCalled();
	});
});
