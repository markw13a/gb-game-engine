import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import { objects } from "../constants/objects";
import type { GameObject } from "@/lib/types/object";

type GameStateObject = {
    map: {
        objects: GameObject[];
    };
};

type AllowedActions = "remove-item";

const reducer = (state: GameStateObject, action: AllowedActions) => {
    return state;
};

const GameStateContext = createContext<{
	state: GameStateObject;
	dispatch: React.ActionDispatch<[action: AllowedActions]>;
} | null>(null);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, { map: { objects } });

	return (
		<GameStateContext value={{ state, dispatch }}>{children}</GameStateContext>
	);
};

export const useGameStateContext = () => {
    const context = useContext(GameStateContext);

    if (!context) {
        throw new Error('GameStateContext consumer not wrapped in appropriate provider')
    }

    return context;
};