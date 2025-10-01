import { render, screen } from "@testing-library/react";
import { CharacterLayer } from "./CharacterLayer";
import type { Direction } from "@/lib/types/direction";

describe("<CharacterLayer />", () => {
	const directions = ["right", "left", "up", "down"] as Direction[];

	directions.forEach((direction) => {
		it(`should render correct idle sprite: ${direction}`, () => {
			render(<CharacterLayer direction={direction} moving={false} />);

			expect(
				screen.getByLabelText(`Character is idle and facing ${direction}`),
			).toBeInTheDocument();
		});
	});

	directions.forEach((direction) => {
		it(`should render correct movement sprite: ${direction}`, () => {
			render(<CharacterLayer direction={direction} moving />);

			expect(
				screen.getByLabelText(`Character is moving and facing ${direction}`),
			).toBeInTheDocument();
		});
	});
});
