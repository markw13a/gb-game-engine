import { useCallback, useRef, useState } from "react";
import { scrollToEnd } from "../map/utils/scrollToEnd/scrollToEnd";
import type { Direction } from "../types/types";

export const useScroll = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = useCallback(async (direction: Direction) => {
        if (scrollContainerRef.current === null) {
            return;
        }

        setIsScrolling(true);
        await scrollToEnd(scrollContainerRef.current, direction);
        setIsScrolling(false);
    }, []);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
    }
};