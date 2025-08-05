import { useCallback, useRef, useState } from "react";
import { scrollToEnd } from "../map/utils/scrollToEnd/scrollToEnd";
import type { Direction } from "../types/types";

export const useScroll = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const isScrollingRef = useRef(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const scroll = useCallback(async (direction: Direction) => {
        if (scrollContainerRef.current === null) {
            return;
        }

        isScrollingRef.current = true;
        setIsScrolling(true);

        await scrollToEnd(scrollContainerRef.current, direction);
        
        isScrollingRef.current = false;
        setIsScrolling(false);
    }, []);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
        isScrollingRef,
    }
};