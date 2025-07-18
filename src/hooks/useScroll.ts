import { useCallback, useRef, useState } from "react";
import { scrollToEnd, type ScrollDirection } from "../utils/scrollToEnd";

export const useScroll = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = useCallback(async (direction: ScrollDirection) => {
        if (scrollContainerRef.current === null) {
            return;
        }

        setIsScrolling(true);
        await scrollToEnd(scrollContainerRef.current, t => t * 0.01, direction);
        setIsScrolling(false);
    }, []);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
    }
};