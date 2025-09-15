import { act, render } from "@testing-library/react";
import { VirtualisedTileRenderer } from "./VirtualisedTileRenderer";
import { generateMap } from "../../__fixtures__/map";
import { generateGameObject } from "../../__fixtures__/gameObject";
import userEvent from "@testing-library/user-event";

// Can't scroll fake DOM: mock so scroll function resolves
vi.mock("@/lib/utils/scrollToEnd");

const defaultProps = {
	characterPos: 12,
	map: generateMap(6),
	objects: [generateGameObject()],
	viewAreaSize: 3,
	disableMovement: false,
	tileSize: 10,
	onMoveStart: vi.fn(),
	onMoveComplete: vi.fn(),
};

describe("<VirtualisedTileRenderer />", () => {
	beforeAll(() => {
		// Testing-library user-events don't work with vi advanceTimers
		// Seems to be developed against jest - need to trick it with this mock
		// https://github.com/testing-library/user-event/issues/1115
		vi.stubGlobal("jest", {
			advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	afterAll(() => {
		vi.unstubAllGlobals();
	});

	it("should call movement callbacks", async () => {
		const interval = 10;
		const moveStartMock = vi.fn();
		const moveCompleteMock = vi.fn();

		vi.useFakeTimers();

		const user = userEvent.setup({
			advanceTimers: vi.advanceTimersByTime.bind(vi),
		});

		render(
			<VirtualisedTileRenderer
				{...defaultProps}
				onMoveStart={moveStartMock}
				onMoveComplete={moveCompleteMock}
			/>,
		);

		await user.keyboard("{w>}");
		await act(() => vi.advanceTimersByTime(interval));
		await user.keyboard("{/w}");

		expect(moveStartMock).toHaveBeenCalled();
		expect(moveCompleteMock).toHaveBeenCalled();
	});

	it("should block movement", async () => {
		const moveStartMock = vi.fn();
		const moveCompleteMock = vi.fn();

		render(
			<VirtualisedTileRenderer
				{...defaultProps}
				disableMovement
				onMoveStart={moveStartMock}
				onMoveComplete={moveCompleteMock}
			/>,
		);

		await userEvent.keyboard("w");

		expect(moveStartMock).not.toHaveBeenCalled();
		expect(moveCompleteMock).not.toHaveBeenCalled();
	});
});
