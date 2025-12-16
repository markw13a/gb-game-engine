import { render, screen } from "@testing-library/react";
import { ResizeMapModal } from "./ResizeMapModal";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";

const defaultProps: ComponentProps<typeof ResizeMapModal> = {
	onClose: vi.fn(),
	onHeightChange: vi.fn(),
	onWidthChange: vi.fn(),
	initialHeight: "0",
	initialWidth: "0",
};

describe("<ImportMapModal />", () => {
	it("should call onWidthChange and onHeightChange", async () => {
		const onWidthChangeMock = vi.fn();
		const onHeightChangeMock = vi.fn();

		render(
			<ResizeMapModal
				{...defaultProps}
				onHeightChange={onHeightChangeMock}
				onWidthChange={onWidthChangeMock}
			/>,
		);

		await userEvent.type(screen.getByLabelText("Width (tiles)"), "2");
		await userEvent.type(screen.getByLabelText("Height (tiles)"), "1");

		await userEvent.click(screen.getByText("Update"));

		expect(onWidthChangeMock).toHaveBeenCalledWith(2);
		expect(onHeightChangeMock).toHaveBeenCalledWith(1);
	});

	it("should call onClose", async () => {
		const onCloseMock = vi.fn();

		render(<ResizeMapModal {...defaultProps} onClose={onCloseMock} />);

		await userEvent.click(screen.getByText("Close"));

		expect(onCloseMock).toHaveBeenCalled();
	});
});
