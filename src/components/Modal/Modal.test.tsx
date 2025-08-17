import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

describe("<Modal />", () => {
    it('should render contents', () => {
        render(<Modal isOpen onClose={vi.fn()}>Test</Modal>);

        expect(screen.getByText('Test')).toBeInTheDocument();
    })

    it('should not render contents', () => {
        render(<Modal isOpen={false} onClose={vi.fn()}>Test</Modal>);

        expect(screen.queryByText('Test')).not.toBeInTheDocument();
    })

    it('should call onClick', async () => {
        const onCloseMock = vi.fn();

        render(<Modal isOpen onClose={onCloseMock}>Test</Modal>);

        await userEvent.click(screen.getByRole('button', { name: 'Close' }));

        expect(onCloseMock).toHaveBeenCalled();
    })
});