import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

describe("<Input />", () => {
	it("should render", () => {
		render(
			<Input onChange={vi.fn()} value="Test">
				Label
			</Input>,
		);

		expect(screen.getByText("Label")).toBeInTheDocument();
		expect(screen.getByLabelText("Label")).toHaveValue("Test");
	});

	it("should call onChange", async () => {
		const onChangeMock = vi.fn();

		render(
			<Input onChange={onChangeMock} value="Test">
				Label
			</Input>,
		);

		await userEvent.clear(screen.getByLabelText("Label"));

		expect(onChangeMock).toHaveBeenCalled();
	});
});
