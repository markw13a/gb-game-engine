import { useEffect, useRef } from "react";

/**
 * Continously calls provided function while the provided key is pressed
 */
export const useWhileKeyPressed = (
	key: string,
	callback: () => Promise<void>,
	interval = 200,
) => {
	const isKeyPressed = useRef(false);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const keyPressed = (e: KeyboardEvent) => {
			if (e.key !== key || e.repeat) {
				return;
			}

			isKeyPressed.current = true;
		};

		const keyReleased = (e: KeyboardEvent) => {
			if (e.key !== key) {
				return;
			}

			isKeyPressed.current = false;
		};

		document.addEventListener("keydown", keyPressed);
		document.addEventListener("keyup", keyReleased);

		return () => {
			document.removeEventListener("keydown", keyPressed);
			document.removeEventListener("keyup", keyReleased);
		};
	}, [key]);

	useEffect(() => {
		let timerId: null | number = null;

		const cb = () => {
			timerId = setTimeout(async () => {
				if (isKeyPressed.current) {
					await callbackRef.current();
				}

				cb();
			}, interval);
		};

		cb();

		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
		};
	}, [key, interval]);
};
