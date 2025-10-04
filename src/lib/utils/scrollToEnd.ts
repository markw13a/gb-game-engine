import type { Direction } from "../types/direction";

const SUB_PIXEL_SIZE = 0.33;

const defaultScrollFunction = (timeElapsed: number) => {
	const TILE_SIZE = 40;
	const TILE_PER_SECOND = 4;
	const TILE_PER_MILISECOND = TILE_PER_SECOND / 1000;

	// Fudge factor to match desired tiles/second with observed scroll behaviour
	// Related to interval that scroll function is called with (via useWhileKeyPressed)
	const MATCH_WITH_GB_CONSTANT = 1.8;

	return TILE_SIZE * TILE_PER_MILISECOND * timeElapsed * MATCH_WITH_GB_CONSTANT;
};

export const scrollToEnd = (
	scrollContainer: HTMLDivElement,
	direction: Direction,
	scrollFunction = defaultScrollFunction,
): Promise<void> => {
	let lastFrameTimestamp = performance.now();

	// Calculate outside of render loop to avoid triggering repaint
	const scrollLeftMax =
		scrollContainer.scrollWidth - scrollContainer.clientWidth - SUB_PIXEL_SIZE;
	const scrollTopMax =
		scrollContainer.scrollHeight -
		scrollContainer.clientHeight -
		SUB_PIXEL_SIZE;

	return new Promise((resolve) => {
		const animate = () => {
			const timestamp = performance.now();
			const timeElapsed = timestamp - lastFrameTimestamp;
			const distanceToScroll = scrollFunction(timeElapsed);

			let isAtMax = false;

			// Aimed to minimise calls to scrollLeft/scrollTop to avoid triggering a repaint
			if (direction === "right" || direction === "left") {
				// biome-ignore lint/suspicious/noAssignInExpressions: performance over readibility here
				const nextValue =
					direction === "right"
						? (scrollContainer.scrollLeft += distanceToScroll)
						: (scrollContainer.scrollLeft -= distanceToScroll);
				isAtMax =
					direction === "right" ? nextValue >= scrollLeftMax : nextValue <= 0;
			}

			if (direction === "up" || direction === "down") {
				// biome-ignore lint/suspicious/noAssignInExpressions: performance over readibility here
				const nextValue =
					direction === "up"
						? (scrollContainer.scrollTop -= distanceToScroll)
						: (scrollContainer.scrollTop += distanceToScroll);
				isAtMax =
					direction === "up" ? nextValue <= 0 : nextValue >= scrollTopMax;
			}

			lastFrameTimestamp = timestamp;

			if (isAtMax) {
				resolve();
				return;
			}

			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	});
};
