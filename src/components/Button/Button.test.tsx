import { render, screen } from "@testing-library/react"
import { Button } from "./Button"
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    it('should render', () => {
        render(<Button onClick={vi.fn()}>Test</Button>);

        expect(screen.getByText('Test')).toBeInTheDocument();
    })

    it('should call onClick', async () => {
        const onClickMock = vi.fn();

        render(<Button onClick={onClickMock}>Test</Button>);

        await userEvent.click(screen.getByRole('button'));

        expect(onClickMock).toHaveBeenCalled();
    })
})