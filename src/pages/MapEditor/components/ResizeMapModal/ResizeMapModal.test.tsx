import { render, screen } from "@testing-library/react";
import { ResizeMapModal } from "./ResizeMapModal";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";

const defaultProps: ComponentProps<typeof ResizeMapModal> = {
	onClose: vi.fn(),
	onResize: vi.fn(),
	initialHeight: "0",
	initialWidth: "0",
};

describe("<ImportMapModal />", () => {
	it("should call onResize", async () => {
		const onResize = vi.fn();

		render(<ResizeMapModal {...defaultProps} onResize={onResize} />);

		await userEvent.type(screen.getByLabelText("Width (tiles)"), "2");
		await userEvent.type(screen.getByLabelText("Height (tiles)"), "1");

		await userEvent.click(screen.getByText("Update"));

		expect(onResize).toHaveBeenCalledWith(2, 1);
	});

	it("should call onClose", async () => {
		const onCloseMock = vi.fn();

		render(<ResizeMapModal {...defaultProps} onClose={onCloseMock} />);

		await userEvent.click(screen.getByText("Close"));

		expect(onCloseMock).toHaveBeenCalled();
	});
});
