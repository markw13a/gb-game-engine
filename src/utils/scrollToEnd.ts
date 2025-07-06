// Based on two frames/second
const defaultScrollFunction = (timeElapsed: number) => {
    const TILE_SIZE = 50;
    const TILE_PER_SECOND = 2;
    const TILE_PER_MILISECOND = TILE_PER_SECOND / 1000;

    return (TILE_SIZE / TILE_PER_MILISECOND) * timeElapsed;
} 

// TODO: Support left/right top/down scroll
export const scrollToEndHorizontal = (scrollContainer: HTMLDivElement, scrollFunction = defaultScrollFunction): Promise<void> => {
    let lastFrameTimestamp = Date.now();
    let currentScrollPos = scrollContainer.scrollLeft;

    return new Promise(resolve => {
        const animate = () => {
            // Can't rely on offsetWidth because it's rounded to nearest integer -- it's actually not possible to set scrollLeft this high!
            // Therefore, need to figure out an alternative method of determining whether the element has finished scrolling
            // Browser renders 3 sub-pixels -- no visible difference in position beyond offsetWidth - 0.33
            const scrollLeftMax = (scrollContainer.scrollWidth - scrollContainer.clientWidth) - 0.33;
    
            const timestamp = Date.now();
            const timeElapsed = timestamp - lastFrameTimestamp;
            const distanceToScroll = scrollFunction(timeElapsed);
    
            const nextScrollPos = currentScrollPos + distanceToScroll;
            scrollContainer.scrollLeft = nextScrollPos;
            currentScrollPos = nextScrollPos;
            lastFrameTimestamp = timestamp;
    
            const isAtMaxScroll = currentScrollPos >= scrollLeftMax;

            if (isAtMaxScroll) {
                resolve();
                return;
            }

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    });
}