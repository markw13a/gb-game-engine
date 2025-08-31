import { useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import { chunkText } from "@/lib/utils/dialog";

type DialogProps = {
	text: string;
	isMultiChoice: boolean;
	onChoice: (choice: "yes" | "no") => void;
	onDialogEnded: () => void;
	interactionKey: string; // TODO: Actually need keys for moving selection between yes and no
	maxCharacters: number;
};

/**
 * @param text Text to be appear within dialog - will be truncated if too long to fit the space
 * @param maxCharacters Maximum length of text before it needs to be split to a new section
 * @param isMultiChoice Causes the Yes/No choice menu to appear
 * @param onChoice Callback will return the choice made by the user
 * @param onDialogEnded Called when the user reaches the end of text
 * @param placement Where should the dialog appear on the screen?
 * @param interactionKey Pressing which key should cause the dialog to scroll or a choice to be made?
 */
export const Dialog = ({
	text,
	maxCharacters,
	isMultiChoice,
	onChoice,
	onDialogEnded,
	interactionKey,
}: DialogProps) => {
	const [textChunks, setTextChunks] = useState<string[]>([]);
	const [activeTextIndex, setActiveTextIndex] = useState(0);
	// Possible to calculate available space?
	// Split text in to least number of chunks to fill that space

	useEffect(() => {
		// No need to chop up text to fit space
		if (text.length < maxCharacters) {
			setTextChunks([text]);
		}

		const chunks = chunkText(text, maxCharacters);
		setTextChunks(chunks);
	}, [text, maxCharacters]);

	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.key !== interactionKey) {
				return;
			}

			if (activeTextIndex === textChunks.length - 1) {
				onDialogEnded();
				return;
			}

			setActiveTextIndex((index) => index + 1);
		};

		document.addEventListener("keydown", listener);

		return () => document.removeEventListener("keydown", listener);
	}, [activeTextIndex, textChunks, interactionKey]);

	// Show first chunk
	// Interaction key pressed
	// Show next chunk
	// If final chunk
	// Call onDialogEnded

	return (
		<div className={styles.container}>
			<div className={styles.text}>{textChunks[activeTextIndex]}</div>
			<div className={styles.indicator}></div>
		</div>
	);
};
