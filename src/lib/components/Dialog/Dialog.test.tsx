import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";
import userEvent from "@testing-library/user-event";

const defaultProps = {
	text: "I'm the fishing guru!",
	maxCharacters: 25,
	isMultiChoice: false,
	onChoice: vi.fn(),
	onDialogEnded: vi.fn(),
	interactionKey: "e",
	downKey: "s",
	upKey: "w",
};

describe("<Dialog />", () => {
	it("should show text", () => {
		const text = "I'm the fishing guru!";
		const maxCharacters = 25;

		render(
			<Dialog {...defaultProps} text={text} maxCharacters={maxCharacters} />,
		);

		expect(screen.getByText("I'm the fishing guru!")).toBeInTheDocument();
	});

	it("should truncate text", async () => {
		const text = "I'm the fishing guru!";
		const maxCharacters = 20;

		render(
			<Dialog {...defaultProps} text={text} maxCharacters={maxCharacters} />,
		);

		expect(screen.getByText("I'm the fishing")).toBeInTheDocument();

		await userEvent.keyboard("e");

		expect(screen.getByText("guru!")).toBeInTheDocument();
	});

	it("should call onDialogEnded", async () => {
		const text = "I'm the fishing guru!";
		const maxCharacters = 25;
		const onDialogEndedMock = vi.fn();

		render(
			<Dialog
				{...defaultProps}
				text={text}
				maxCharacters={maxCharacters}
				onDialogEnded={onDialogEndedMock}
			/>,
		);

		await userEvent.keyboard("e");

		expect(onDialogEndedMock).toHaveBeenCalled();
	});

	it("should show choice menu", () => {
		render(<Dialog {...defaultProps} isMultiChoice />);

		expect(screen.getByText("Yes")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();
	});

	it("should show choice menu once all text has been shown", async () => {
		const text = "I'm the fishing guru!";
		const maxCharacters = 20;

		render(
			<Dialog
				{...defaultProps}
				text={text}
				maxCharacters={maxCharacters}
				isMultiChoice
			/>,
		);

		expect(screen.getByText("I'm the fishing")).toBeInTheDocument();
		expect(screen.queryByText("Yes")).not.toBeInTheDocument();
		expect(screen.queryByText("No")).not.toBeInTheDocument();

		await userEvent.keyboard("e");

		expect(screen.getByText("Yes")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();
	});

	it("should make choice", async () => {
		const onChoiceMock = vi.fn();
		const onDialogEndedMock = vi.fn();

		render(
			<Dialog
				{...defaultProps}
				isMultiChoice
				onChoice={onChoiceMock}
				onDialogEnded={onDialogEndedMock}
			/>,
		);

		// Select "Yes"
		await userEvent.keyboard("e");
		expect(onChoiceMock).toHaveBeenCalledWith("Yes");

		// Select "No"
		await userEvent.keyboard("s");
		await userEvent.keyboard("e");
		expect(onChoiceMock).toHaveBeenLastCalledWith("No");
		expect(onDialogEndedMock).toHaveBeenCalledTimes(2);
	});
});
