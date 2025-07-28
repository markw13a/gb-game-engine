import { useEffect, useRef } from "react";

type KeyMap = Record<string, () => void>; 

export const useWhileKeyPressed = (
    keymap: KeyMap,  
    interval = 100
) => {
    const keysPressedRef = useRef<string[]>([]);

    useEffect(() => {
        const keyPressed = ({ key, repeat }: KeyboardEvent) => {
            const isMappedKey = !!keymap[key];

            if (!isMappedKey || repeat) {
                return;
            }

            keysPressedRef.current = [...keysPressedRef.current, key];
        };
        
        const keyReleased = ({ key }: KeyboardEvent) => {
            const isMappedKey = !!keymap[key];

            if (!isMappedKey) {
                return;
            }

            keysPressedRef.current = keysPressedRef.current.filter(k => k !== key);
        }

        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);

        return () => {
            document.removeEventListener('keydown', keyPressed);
            document.removeEventListener('keyup', keyReleased);
        }
    }, [keymap]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            keysPressedRef.current.forEach(k => keymap[k]())
        }, interval);

        return () => clearInterval(intervalId);
    }, [keymap, interval])
};