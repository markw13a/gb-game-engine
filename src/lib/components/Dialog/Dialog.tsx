import { useEffect, useState } from "react";
import styles from "./Dialog.module.css";
import { chunkText } from "@/lib/utils/dialog";

import indicatorSrc from "./assets/indicator.svg";

import { DialogContainer } from "./components/DialogContainer";

type Choice = "Yes" | "No";

type SupportedClass =
	| "container"
	| "contents"
	| "contentsContainer"
	| "choices"
	| "choice"
	| "choiceIndicator"
	| "text"
	| "dialog";

type DialogProps = {
	text: string;
	onChoice?: (choice: Choice) => void;
	onDialogEnded: () => void;
	maxCharacters: number;
	interactionKey: string;
	downKey: string;
	upKey: string;
	isMultiChoice?: boolean;
	classNames?: Partial<Record<SupportedClass, string>>;
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
	classNames = {},
	text,
	maxCharacters,
	isMultiChoice = false,
	onChoice = () => {},
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
		interactionKey,
		downKey,
		upKey,
		isMultiChoice,
		highlightedOption,
		isAtLastChunk,
		onChoice,
		onDialogEnded,
	]);

	return (
		<>
			<DialogContainer
				classNames={{
					container: `${styles.container} ${classNames.container}`,
					contentsContainer: `${styles.contentsContainer}`,
				}}
			>
				<div className={`${styles.dialog} ${classNames.dialog}`}>
					<div className={`${styles.text} ${classNames.text}`}>
						{textChunks[activeTextIndex]}
					</div>
					<div className={styles.indicator}>
						{isAtLastChunk ? (
							""
						) : (
							<img
								aria-hidden
								className={styles.dialog__indicator}
								src={indicatorSrc}
								width="18px"
							/>
						)}
					</div>
				</div>
			</DialogContainer>
			{isMultiChoice && isAtLastChunk && (
				<DialogContainer
					classNames={{
						container: `${styles.choices} ${classNames.choices}`,
						contents: styles.choices__contents,
					}}
				>
					<button
						className={`${styles.choice} ${classNames.choice}`}
						type="button"
						onClick={() => onChoice("Yes")}
					>
						<span
							className={`${styles.choiceIndicator} ${classNames.choiceIndicator}`}
						>
							{highlightedOption === "Yes" ? ">" : ""}
						</span>
						<span>Yes</span>
					</button>
					<button
						className={`${styles.choice} ${classNames.choice}`}
						type="button"
						onClick={() => onChoice("No")}
					>
						<span
							className={`${styles.choiceIndicator} ${classNames.choiceIndicator}`}
						>
							{highlightedOption === "No" ? ">" : ""}
						</span>
						<span>No</span>
					</button>
				</DialogContainer>
			)}
		</>
	);
};
