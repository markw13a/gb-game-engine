import { render, screen } from "@testing-library/react";
import { Map } from "./Map";
import userEvent from "@testing-library/user-event";

const defaultProps = {
	width: 2,
	height: 1,
	tileSize: "50px",
	tiles: [{ label: "Label", img: "/img/path.png" }, null],
	getTileLabel: vi.fn(),
	getTileImgSrc: vi.fn(),
	onClickTile: vi.fn(),
};

describe("<Map />", () => {
	it("should render", () => {
		render(
			<Map
				{...defaultProps}
				getTileLabel={(tile) => (tile ? tile.label : "")}
			/>,
		);

		expect(screen.getByTestId("Label tile")).toBeInTheDocument();
		expect(screen.getByTestId("Empty tile")).toBeInTheDocument();
	});

	it("should call onClick", async () => {
		const onClickTileMock = vi.fn();

		render(
			<Map
				{...defaultProps}
				onClickTile={onClickTileMock}
				getTileLabel={(tile) => (tile ? tile.label : "")}
			/>,
		);

		await userEvent.click(screen.getByTestId("Empty tile"));
		await userEvent.click(screen.getByTestId("Label tile"));

		expect(onClickTileMock).toHaveBeenCalledTimes(2);
	});
});
