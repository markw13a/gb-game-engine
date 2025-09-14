import { render, screen } from "@testing-library/react";
import { DialogLayer } from "./DialogLayer";
import userEvent from "@testing-library/user-event";

describe("<DialogLayer />", () => {
	it("should not render if no text provided", () => {
		render(<DialogLayer text="" />);

		expect(screen.queryByLabelText("game-dialog")).not.toBeInTheDocument();
	});

	it("should call onDialogEnded", async () => {
		const onDialogEnded = vi.fn();

		render(<DialogLayer text="Test" onDialogEnded={onDialogEnded} />);

		await userEvent.keyboard("e");

		expect(onDialogEnded).toHaveBeenCalled();
	});
});
