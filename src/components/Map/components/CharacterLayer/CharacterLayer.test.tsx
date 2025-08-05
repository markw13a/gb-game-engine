import { render, screen } from "@testing-library/react";
import { CharacterLayer } from "./CharacterLayer";
import type { Direction } from "../../../../types/types";

const sprites = {
    idle: { right: '/right.png', left: '/left.png', up: '/up.png', down: '/down.png' },
    moving: { right: '', left: '', up: '', down: '' }
}

describe("<CharacterLayer />", () => {
    const directions = ['right', 'left', 'up', 'down'] as Direction[];

    directions.forEach(direction => {
        it(`should render correct idle sprite: ${direction}`, () => {
            render(<CharacterLayer direction={direction} moving={false} sprites={sprites} />);

            expect(screen.getByTestId('character')).toHaveStyle({ backgroundImage: `url('${sprites.idle[direction]}')` });
        })
    });

    directions.forEach(direction => {
        it(`should render correct movement sprite: ${direction}`, () => {
            render(<CharacterLayer direction={direction} moving sprites={sprites} />);

            expect(screen.getByTestId('character')).toHaveStyle({ backgroundImage: `url('${sprites.moving[direction]}')` });
        })
    });
});
