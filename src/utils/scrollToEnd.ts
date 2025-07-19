import type { ScrollDirection } from "../types/types";

// Based on two frames/second
const defaultScrollFunction = (timeElapsed: number) => {
    const TILE_SIZE = 50;
    const TILE_PER_SECOND = 2;
    const TILE_PER_MILISECOND = TILE_PER_SECOND / 1000;

    return (TILE_SIZE / TILE_PER_MILISECOND) * timeElapsed;
} 

export const scrollToEnd = (scrollContainer: HTMLDivElement, scrollFunction = defaultScrollFunction, direction: ScrollDirection): Promise<void> => {
    let lastFrameTimestamp = Date.now();
    // Makes this less reusable, but we need to reset scroll position to 0 before beginning
    let currentScrollPosHorizontal = scrollContainer.scrollLeft;
    let currentScrollPosVertical = scrollContainer.scrollTop;

    // TODO: Tidy this up: no need to handle code for all four directions together
    return new Promise(resolve => {
        const animate = () => {
            // Can't rely on offsetWidth because it's rounded to nearest integer -- it's actually not possible to set scrollLeft this high!
            // Therefore, need to figure out an alternative method of determining whether the element has finished scrolling
            // Browser renders 3 sub-pixels -- no visible difference in position beyond offsetWidth - 0.33
            const scrollLeftMax = (scrollContainer.scrollWidth - scrollContainer.clientWidth) - 0.33;
            const scrollLeftMin = 0;

            const scrollTopMax = (scrollContainer.scrollHeight - scrollContainer.clientHeight) - 0.33;
            const scrollTopMin = 0;

            const timestamp = Date.now();
            const timeElapsed = timestamp - lastFrameTimestamp;
            const distanceToScroll = scrollFunction(timeElapsed);
    
            const nextScrollPosRight = currentScrollPosHorizontal + distanceToScroll;
            const nextScrollPosLeft = currentScrollPosHorizontal - distanceToScroll;

            const nextScrollPosTop = currentScrollPosVertical - distanceToScroll;
            const nextScrollPosBottom = currentScrollPosVertical + distanceToScroll;

            if (direction === "right") {
                scrollContainer.scrollLeft = nextScrollPosRight;
                currentScrollPosHorizontal = nextScrollPosRight;
            } else if (direction === "left") {
                scrollContainer.scrollLeft = nextScrollPosLeft;
                currentScrollPosHorizontal = nextScrollPosLeft;
            } else if (direction === "up") {
                scrollContainer.scrollTop = nextScrollPosTop;
                currentScrollPosVertical = nextScrollPosTop;
            } else if (direction === "down") {
                scrollContainer.scrollTop = nextScrollPosBottom;
                currentScrollPosVertical = nextScrollPosBottom;
            }

            lastFrameTimestamp = timestamp;
    
            const isAtMaxScroll = currentScrollPosHorizontal >= scrollLeftMax;
            const isAtMinScroll = currentScrollPosHorizontal <= scrollLeftMin;
        
            const isAtMaxScrollVertical = currentScrollPosVertical >= scrollTopMax;
            const isAtMinScrollVertical = currentScrollPosVertical <= scrollTopMin;

            // Scroll container could start at 0 or end of container, so need to check direction too
            if (isAtMaxScroll && direction === "right") {
                resolve();
                return;
            }
        
            if (isAtMinScroll && direction === "left") {
                resolve();
                return;
            }

            if (isAtMaxScrollVertical && direction === "down") {
                resolve();
                return;
            }

            if (isAtMinScrollVertical && direction === "up") {
                resolve();
                return;
            }

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    });
}