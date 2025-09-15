import { generateGameObject } from "../__fixtures__/gameObject"
import { reducer, type GameStateObject } from "./GameStateProvider"

describe('<GameStateProvider />', () => {
    it('should remove item', () => {
        const initialState: GameStateObject = {objects: [generateGameObject({ id: '1' })]}
        const nextState = reducer(initialState, { type: 'remove-item', payload: { id: '1' } });

        expect(nextState.objects).toEqual([]);
    });
})