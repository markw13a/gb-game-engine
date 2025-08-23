import { render, screen } from "@testing-library/react"
import { ImportMapModal } from "./ImportMapModal"
import userEvent from "@testing-library/user-event";

describe('<ImportMapModal />', () => {
    it('should not render', () => {
        render(<ImportMapModal isOpen={false} onClose={vi.fn()} onImport={vi.fn()} />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
    
    it('should call onImport', async () => {
        const onImportMock = vi.fn();

        render(<ImportMapModal onImport={onImportMock} onClose={vi.fn()} isOpen />);

        await userEvent.type(screen.getByLabelText('Width (tiles)'), '2')
        await userEvent.type(screen.getByLabelText('Height (tiles)'), '1')
        await userEvent.type(screen.getByLabelText('Map string'), 'Gg')

        await userEvent.click(screen.getByText('Import'));

        expect(onImportMock).toHaveBeenCalledWith(2, 1, 'Gg');
    })

    it('should call onClose', async () => {
        const onCloseMock = vi.fn();
        
        render(<ImportMapModal onImport={vi.fn()} onClose={onCloseMock} isOpen />);

        await userEvent.click(screen.getByText('Close'));

        expect(onCloseMock).toHaveBeenCalled();
    })
})