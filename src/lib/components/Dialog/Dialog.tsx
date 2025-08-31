type DialogProps = {
    text: string;
    isMultiChoice: boolean;
    onChoice: (choice: "yes" | "no") => void;
    onDialogEnded: () => void;
    placement: "bottom"; // TODO: Consider allowing dialog to be attached to top/bottom/left/right of screen
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
export const Dialog = ({ text, maxCharacters, isMultiChoice, onChoice, onDialogEnded, placement, interactionKey }: DialogProps) => {
    // Possible to calculate available space?
    // Split text in to least number of chunks to fill that space
    
    // Show first chunk
    // Interaction key pressed
    // Show next chunk
    // If final chunk
    // Call onDialogEnded

    return null;
}