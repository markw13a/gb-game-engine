import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("<Modal />", () => {
    it('should render contents', () => {
        render(<Modal isOpen>Test</Modal>);

        expect(screen.getByText('Test')).toBeInTheDocument();
    })

    it('should not render contents', () => {
        render(<Modal isOpen={false}>Test</Modal>);

        expect(screen.queryByText('Test')).not.toBeInTheDocument();
    })
});