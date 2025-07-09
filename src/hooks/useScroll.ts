import { useCallback, useRef, useState } from "react";
import { scrollToEndHorizontal } from "../utils/scrollToEnd";

// TODO: Add support for direction? Need to add tile layer all around "viewing" area to support that
export const useScroll = ({ onScrollComplete }: { onScrollComplete: () => void }) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = useCallback(async () => {
        if (scrollContainerRef.current === null) {
            return;
        }

        setIsScrolling(true);
        await scrollToEndHorizontal(scrollContainerRef.current, t => t * 0.01);
        setIsScrolling(false);
        onScrollComplete();
    }, [isScrolling, onScrollComplete]);

    return {
        scrollContainerRef,
        scroll,
        isScrolling,
    }
};