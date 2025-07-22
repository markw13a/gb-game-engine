import { useEffect, useRef } from "react";

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

// TODO: Split to separate file + test coverage
export const useWhileKeyPressed = (
    key: string, 
    callback: () => Promise<void>, 
    interval = 1000
) => {
    const keyPressedRef = useRef(false);

    useEffect(() => {
        const keyPressed = (e: KeyboardEvent) => {
            // Problem is here, we're not allowing the updated callback to be used within a new setInterval
            // Tricky, I do need to block the key being held resetting 
            if (e.key !== key || e.repeat) {
                return;
            }

            keyPressedRef.current = true; 
        };
        
        const keyReleased = (e: KeyboardEvent) => {
            if (e.key !== key) {
                return;
            }

            keyPressedRef.current = false;
        }

        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);

        return () => {
            document.removeEventListener('keydown', keyPressed);
            document.removeEventListener('keyup', keyReleased);
        }
    }, [key]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!keyPressedRef.current) {
                return;
            }

            callback();
        }, interval);

        return () => clearInterval(intervalId);
    }, [callback, interval])
};