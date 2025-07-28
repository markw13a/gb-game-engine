import { useEffect } from "react";

type KeyMaps = Record<string, () => void>; 

export const useKeyListener = (keyMaps: KeyMaps) => {
    useEffect(() => {
        const listener = ({ key }: KeyboardEvent) => {
            const onKeyPress = keyMaps[key];

            if (onKeyPress) {
                onKeyPress();
            }
        };

        document.addEventListener('keydown', listener);

        return () => document.removeEventListener('keydown', listener);
    }, [keyMaps]);
};
