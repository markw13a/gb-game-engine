import { useEffect, useRef } from "react";

export const useWhileKeyPressed = (
    key: string, 
    callback: () => Promise<void>, 
    interval = 100
) => {
    const keyPressedRef = useRef(false);

    useEffect(() => {
        const keyPressed = (e: KeyboardEvent) => {
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