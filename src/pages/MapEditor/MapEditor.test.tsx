import { render, screen } from "@testing-library/react";
import { MapEditor } from "./MapEditor";
import userEvent from "@testing-library/user-event";

type Tile = {
	type: string;
	label: string;
	sprite: string;
	isPassable: boolean;
};

const defaultProps = {
	tileSize: "16px",
	getTileFromSymbol: vi.fn(),
	getTileSymbol: (tile: Tile | undefined) => (tile ? "G" : ""),
	getTileLabel: (tile: Tile) => tile.type,
	getTileImgSrc: (tile: Tile) => tile.sprite,
	tileOptions: [
		{
			type: "grass",
			label: "Grass",
			sprite: "/sprites/grass",
			isPassable: true,
		},
		{
			type: "tall-grass",
			label: "Tall Grass",
			sprite: "/sprites/tall-grass",
			isPassable: true,
		},
	],
};

describe("<MapEditor />", () => {
	it("should set width and height", async () => {
		render(<MapEditor {...defaultProps} />);

		await userEvent.click(screen.getByRole("button", { name: "Resize" }));
		await userEvent.type(screen.getByLabelText("Width (tiles)"), "10");
		await userEvent.type(screen.getByLabelText("Height (tiles)"), "12");
		await userEvent.click(screen.getByText("Update"));

		expect(screen.getAllByTestId("Empty tile")).toHaveLength(120);
	});

	it("should select a tile brush", async () => {
		render(<MapEditor {...defaultProps} />);

		expect(screen.getByText("Selected: None")).toBeInTheDocument();

		await userEvent.click(screen.getByLabelText("Select grass brush"));

		expect(screen.getByText("Selected: grass")).toBeInTheDocument();
	});

	it("should paint a tile", async () => {
		render(<MapEditor {...defaultProps} />);

		await userEvent.click(screen.getByText("Resize"));
		await userEvent.type(screen.getByLabelText("Width (tiles)"), "1");
		await userEvent.type(screen.getByLabelText("Height (tiles)"), "1");
		await userEvent.click(screen.getByText("Update"));

		expect(screen.getByTestId("Empty tile")).toBeInTheDocument();

		await userEvent.click(screen.getByLabelText("Select grass brush"));
		await userEvent.click(screen.getAllByTestId("Empty tile")[0]);

		expect(screen.getByTestId("grass tile")).toBeInTheDocument();
		expect(screen.getByLabelText("Output")).toHaveValue(
			JSON.stringify(
				{ dimensions: { width: 1, height: 1 }, map: "G" },
				null,
				2,
			),
		);
	});
});
