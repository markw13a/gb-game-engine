import {
	createContext,
	useContext,
	useReducer,
	type PropsWithChildren,
} from "react";
import { objects } from "../constants/objects";
import type { GameObject } from "@/lib/types/object";

export type GameStateObject = {
	objects: GameObject[];
};

type RemoveItemAction = { type: "remove-item"; payload: { id: string } };

type GameStateAction = RemoveItemAction;

export const reducer = (
	state: GameStateObject,
	{ type, payload }: GameStateAction,
) => {
	switch (type) {
		case "remove-item":
			const objects = state.objects;
			const nextObjects = objects.filter((object) => object.id !== payload.id);

			return { ...state, objects: nextObjects };
		default:
			throw new Error(`Unsupported action type ${type}`);
	}
};

const GameStateContext = createContext<{
	state: GameStateObject;
	dispatch: React.ActionDispatch<[action: GameStateAction]>;
} | null>(null);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, { objects });

	return (
		<GameStateContext value={{ state, dispatch }}>{children}</GameStateContext>
	);
};

export const useGameStateContext = () => {
	const context = useContext(GameStateContext);

	if (!context) {
		throw new Error(
			"GameStateContext consumer not wrapped in appropriate provider",
		);
	}

	return context;
};
