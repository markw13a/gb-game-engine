import { render, screen } from "@testing-library/react";
import { CharacterLayer } from "./CharacterLayer";
import type { Direction } from "../../../../types/types";

const sprites = {
    idle: { 
        right: '/idle/right.png', 
        left: '/idle/left.png', 
        up: '/idle/up.png', 
        down: '/idle/down.png' 
    },
    moving: { 
        right: '/moving/right.png', 
        left: '/moving/left.png', 
        up: '/moving/up.png', 
        down: '/moving/down.png' 
    }
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
