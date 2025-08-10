import { useEffect } from "react";

type KeyListenerOptions = {
    ignoreRepeat?: boolean
}

export const useKeyListener = (
    key: string, 
    onKeyPress: () => void, 
    onKeyReleased: () => void, 
    options: KeyListenerOptions = {}
) => {
    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            const ignoreEvent = (options.ignoreRepeat && e.repeat) || (e.key !== key);

            if (!ignoreEvent) {
                onKeyPress();
            }
        };

        const keyup = (e: KeyboardEvent) => {
            if (e.key !== key) {
                return;
            }

            onKeyReleased();
        };

        document.addEventListener('keydown', keydown);
        document.addEventListener('keyup', keyup);

        return () => {
            document.removeEventListener('keydown', keydown);
            document.removeEventListener('keyup', keyup);
        }
    }, [key, onKeyPress, onKeyReleased, options]);
};
