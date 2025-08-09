import { useEffect } from "react";

type KeyMap = {
    onKeyPressed?: () => void;
    onKeyReleased?: () => void;
}
type KeyMaps = Record<string, KeyMap>; 

type KeyListenerOptions = {
    ignoreRepeat?: boolean
}

export const useKeyListener = (keyMaps: KeyMaps, { ignoreRepeat = false }: KeyListenerOptions = {}) => {
    useEffect(() => {
        const keydown = ({ key, repeat }: KeyboardEvent) => {
            const onKeyPress = keyMaps[key]?.onKeyPressed;

            const ignoreEvent = ignoreRepeat && repeat;

            if (onKeyPress && !ignoreEvent) {
                onKeyPress();
            }
        };

        const keyup = ({ key }: KeyboardEvent) => {
            const onKeyReleased = keyMaps[key]?.onKeyReleased;

            if (onKeyReleased) {
                onKeyReleased();
            }
        };

        document.addEventListener('keydown', keydown);
        document.addEventListener('keyup', keyup);

        return () => {
            document.removeEventListener('keydown', keydown);
            document.removeEventListener('keyup', keyup);
        }
    }, [keyMaps, ignoreRepeat]);
};
