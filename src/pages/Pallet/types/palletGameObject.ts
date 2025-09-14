import type { GameObject } from "@/lib/types/object";
import type { Actions } from "./actions";

export type PalletGameObject = Omit<GameObject, "events"> & {
	events: Actions[];
};
