import { useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import { chunkText } from "@/lib/utils/dialog";

type Choice = "Yes" | "No";

type SupportedClass =
	| "container"
	| "contents"
	| "contentsContainer"
	| "choices"
	| "choice"
	| "indicator"
	| "text"
	| "dialog";

type DialogProps = {
	text: string;
	onChoice: (choice: Choice) => void;
	onDialogEnded: () => void;
	maxCharacters: number;
	interactionKey: string;
	downKey: string;
	upKey: string;
	isMultiChoice?: boolean;
	classNames?: Record<SupportedClass, string>;
};

/**
 * @param text Text to be appear within dialog - will be truncated if too long to fit the space
 * @param maxCharacters Maximum length of text before it needs to be split to a new section
 * @param isMultiChoice Causes the Yes/No choice menu to appear
 * @param onChoice Callback will return the choice made by the user
 * @param onDialogEnded Called when the user reaches the end of text
 * @param placement Where should the dialog appear on the screen?
 * @param interactionKey Pressing which key should cause the dialog to scroll or a choice to be made?
 * @param classNames Style overrides for various parts of the rendered UI
 */
export const Dialog = ({
	classNames = {
		contentsContainer: styles.contentsContainer,
		container: styles.container,
		indicator: styles.indicator,
		contents: styles.contents,
		choices: styles.choices,
		choice: styles.choice,
		dialog: styles.dialog,
		text: styles.text,
	},
	text,
	maxCharacters,
	isMultiChoice = false,
	onChoice,
	onDialogEnded,
	interactionKey,
	downKey,
	upKey,
}: DialogProps) => {
	const [textChunks, setTextChunks] = useState<string[]>([]);
	const [activeTextIndex, setActiveTextIndex] = useState(0);
	const [highlightedOption, setHightlightedOption] = useState<Choice>("Yes");

	const isAtLastChunk = activeTextIndex === textChunks.length - 1;

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

			isAtLastChunk
				? onDialogEnded()
				: setActiveTextIndex((index) => index + 1);
		};

		const multiListener = (e: KeyboardEvent) => {
			const isMovementKey = [upKey, downKey].includes(e.key);
			const isInteractionKey = e.key === interactionKey;

			if (!isMultiChoice) {
				return;
			}

			if (isMovementKey) {
				setHightlightedOption((choice) => (choice === "Yes" ? "No" : "Yes"));
				return;
			}

			if (isInteractionKey && isAtLastChunk) {
				onChoice(highlightedOption);
				return;
			}
		};

		document.addEventListener("keydown", listener);
		document.addEventListener("keydown", multiListener);

		return () => {
			document.removeEventListener("keydown", listener);
			document.removeEventListener("keydown", multiListener);
		};
	}, [
		activeTextIndex,
		textChunks,
		interactionKey,
		downKey,
		upKey,
		isMultiChoice,
		highlightedOption,
		isAtLastChunk,
	]);

	return (
		<div className={classNames.container}>
			<div className={classNames.contentsContainer}>
				<div className={classNames.contents}>
					<div className={classNames.dialog}>
						<div className={classNames.text}>{textChunks[activeTextIndex]}</div>
						<div className={classNames.indicator}>
							{isAtLastChunk ? "" : "/"}
						</div>
					</div>
					{isMultiChoice && isAtLastChunk && (
						<div className={classNames.choices}>
							<button
								className={classNames.choice}
								type="button"
								onClick={() => onChoice("Yes")}
							>
								{highlightedOption === "Yes" ? ">" : ""} Yes
							</button>
							<button
								className={classNames.choice}
								type="button"
								onClick={() => onChoice("No")}
							>
								{highlightedOption === "No" ? ">" : ""} No
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
