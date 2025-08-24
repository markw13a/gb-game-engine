import type { GameObjectEvent } from "@/lib/types/object";
import { useEffect } from "react";

// TODO: Do we actually need this? Don't think so...
export const useObjectInteractionListener = <
	T extends GameObjectEvent = GameObjectEvent,
>(
	event: T,
	callback: () => void,
) => {
	useEffect(() => {
		document.addEventListener(event, callback);
		return () => document.removeEventListener(event, callback);
	}, [event, callback]);
};
