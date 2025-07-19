import { useCallback, useRef, useState } from "react";
import { scrollToEnd } from "../map/utils/scrollToEnd/scrollToEnd";
import type { ScrollDirection } from "../types/types";

export const useScroll = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = useCallback(async (direction: ScrollDirection) => {
        if (scrollContainerRef.current === null) {
            return;
        }

        setIsScrolling(true);
        await scrollToEnd(scrollContainerRef.current, t => t * 0.1, direction);
        setIsScrolling(false);
    }, []);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
    }
};