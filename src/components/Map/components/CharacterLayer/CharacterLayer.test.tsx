import { render, screen } from "@testing-library/react";
import { CharacterLayer } from "./CharacterLayer";

describe("<CharacterLayer />", () => {
    it('should render', () => {
        render(<CharacterLayer direction="right" moving={false} />);
    
        expect(screen.getByTestId('character')).toHaveAttribute('data-moving', 'false');
        expect(screen.getByTestId('character')).toHaveAttribute('data-direction', 'right');
    })
});