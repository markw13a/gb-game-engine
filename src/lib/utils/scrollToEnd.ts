import type { Direction } from "../types/direction";

const SUB_PIXEL_SIZE = 0.33;

const defaultScrollFunction = (timeElapsed: number) => {
	const TILE_SIZE = 50;
	const TILE_PER_SECOND = 4;
	const TILE_PER_MILISECOND = TILE_PER_SECOND / 1000;

	// Fudge factor to match desired tiles/second with observed scroll behaviour
	// Related to interval that scroll function is called with (via useWhileKeyPressed)
	const MATCH_WITH_GB_CONSTANT = 1.8;

	return TILE_SIZE * TILE_PER_MILISECOND * timeElapsed * MATCH_WITH_GB_CONSTANT;
};

const getIsAtMaxScroll = (scrollContainer: HTMLDivElement) => {
	const scrollLeftMax =
		scrollContainer.scrollWidth - scrollContainer.clientWidth - SUB_PIXEL_SIZE;
	const scrollTopMax =
		scrollContainer.scrollHeight -
		scrollContainer.clientHeight -
		SUB_PIXEL_SIZE;

	return {
		left: scrollContainer.scrollLeft <= 0,
		right: scrollContainer.scrollLeft >= scrollLeftMax,
		up: scrollContainer.scrollTop <= 0,
		down: scrollContainer.scrollTop >= scrollTopMax,
	};
};

export const scrollToEnd = (
	scrollContainer: HTMLDivElement,
	direction: Direction,
	scrollFunction = defaultScrollFunction,
): Promise<void> => {
	let lastFrameTimestamp = Date.now();

	return new Promise((resolve) => {
		const animate = () => {
			const timestamp = Date.now();
			const timeElapsed = timestamp - lastFrameTimestamp;
			const distanceToScroll = scrollFunction(timeElapsed);

			if (direction === "right") {
				scrollContainer.scrollLeft += distanceToScroll;
			} else if (direction === "left") {
				scrollContainer.scrollLeft -= distanceToScroll;
			} else if (direction === "up") {
				scrollContainer.scrollTop -= distanceToScroll;
			} else if (direction === "down") {
				scrollContainer.scrollTop += distanceToScroll;
			}

			lastFrameTimestamp = timestamp;

			// Scroll container could start at 0 or end of container, so need to check direction too
			const isAtMaxByDirection = getIsAtMaxScroll(scrollContainer);
			const isAtMax = isAtMaxByDirection[direction];

			if (isAtMax) {
				resolve();
				return;
			}

			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	});
};
