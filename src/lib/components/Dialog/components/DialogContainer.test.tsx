import { render, screen } from "@testing-library/react"
import { DialogContainer } from "./DialogContainer"

describe("<DialogContainer />", () => {
    it('should render', () => {
        render(<DialogContainer>Test text</DialogContainer>);

        expect(screen.getByText("Test text")).toBeInTheDocument();
        expect(screen.getAllByRole('img', { hidden: true })).toHaveLength(4);
    })
})