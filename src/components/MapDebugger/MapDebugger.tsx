import type { Map } from "../../types/types";
import styles from "./mapDebugger.module.css";

type MapDebuggerProps = {
    map: Map;
};

export const MapDebugger = ({ map }: MapDebuggerProps) => {
    // TODO: Implicit assumption about map being square -- should move getting 'sideLength' to global util?
    const sideLength = Math.sqrt(map.length);
    
    return (
        <div className={styles.debugContainer} style={{ gridTemplateColumns: `repeat(${sideLength}, 1fr)`, gridTemplateRows: `repeat(${sideLength}, 1fr)` }}>
            {
                Array.from(map).map((tile, i) => (
                    <div key={i} style={{ backgroundColor: tile.color, height: '50px', width: '50px' }}>{i}</div>
                ))
            }
        </div>
    )
};