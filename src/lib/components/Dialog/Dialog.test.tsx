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

	it("should call onDialogEnded", () => {
		// text fits within section
		// mock onDialogEnded
		// press interaction key
		// confirm onDialogEnded was called
	});

	it("should show choice menu", () => {
		// text fits
		// isMultiChoice
		// Cofirm yes/no options visible
	});

	it("should show choice menu once all text has been shown", () => {
		// text does not fit
		// isMultiChoice
		// check first text section shown
		// check yes/no not shown
		// press interaction key
		// check yes/no shown
	});

	it("should make choice", () => {
		// text fits
		// isMultiChoice
		// Check yes/no options visible
		// press interaction key
		// check onChoice called with "yes"
		// press "down" key (forgot we'd need one!)
		// press interaction key
		// check onChoice called with "no"
	});
});
