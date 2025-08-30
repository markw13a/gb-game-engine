import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";
import userEvent from "@testing-library/user-event";

describe("<Menu />", () => {
	it("should render", async () => {
		const widthChangeMock = vi.fn();
		const heightChangeMock = vi.fn();
		const brushChangeMock = vi.fn();

		const brushOptions = [
			{
				name: "Grass",
				sprite: "/grass",
			},
			{
				name: "Rocks",
				sprite: "/rocks",
			},
		];

		render(
			<Menu
				width={12}
				height={13}
				mapString={"GGG"}
				tileOptions={brushOptions}
				brush={brushOptions[0]}
				getBrushLabel={(tile) => tile.name}
				getBrushImgSrc={(tile) => tile.sprite}
				getTileFromSymbol={vi.fn()}
				onBrushChange={brushChangeMock}
				onHeightChange={heightChangeMock}
				onOutputChange={vi.fn()}
				onWidthChange={widthChangeMock}
			/>,
		);

		expect(screen.getByLabelText("Width (tiles)")).toHaveValue('12');
		expect(screen.getByLabelText("Height (tiles)")).toHaveValue('13');
		expect(screen.getByLabelText("Output")).toHaveValue(JSON.stringify({ "dimensions": { "width": 12, "height": 13 }, "map": "GGG" }, null, 2));
		expect(screen.getByText("Selected: Grass")).toBeInTheDocument();

		await userEvent.type(screen.getByLabelText("Width (tiles)"), "15");
		await userEvent.type(screen.getByLabelText("Height (tiles)"), "16");
		await userEvent.click(screen.getByLabelText("Select Rocks brush"));

		expect(widthChangeMock).toHaveBeenCalled();
		expect(heightChangeMock).toHaveBeenCalled();
		expect(brushChangeMock).toHaveBeenCalledWith(brushOptions[1]);
	});
});
