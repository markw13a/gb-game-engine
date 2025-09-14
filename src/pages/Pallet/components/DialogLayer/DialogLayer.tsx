import { Dialog } from "@/lib/components/Dialog/Dialog";

type DialogLayerProps = {
	text: string;
	onDialogEnded?: () => void;
	onChoice?: () => void;
};

export const DialogLayer = ({
	text,
	onDialogEnded = () => {},
	onChoice = () => {},
}: DialogLayerProps) => {
	if (!text) {
		return null;
	}

	return (
		<Dialog
			text={text}
			maxCharacters={20}
			onChoice={onChoice}
			onDialogEnded={onDialogEnded}
			isMultiChoice
			interactionKey="e"
			downKey="s"
			upKey="w"
		/>
	);
};
