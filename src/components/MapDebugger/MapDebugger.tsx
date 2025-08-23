import type { Map } from "../../types/map";
import styles from "./mapDebugger.module.css";

type MapDebuggerProps = {
	map: Map;
};

export const MapDebugger = ({ map }: MapDebuggerProps) => {
	const sideLength = Math.sqrt(map.length);

	return (
		<div
			className={styles.debugContainer}
			style={{
				gridTemplateColumns: `repeat(${sideLength}, 1fr)`,
				gridTemplateRows: `repeat(${sideLength}, 1fr)`,
			}}
		>
			{Array.from(map).map((tile, i) => (
				<div
					key={i}
					style={{
						backgroundColor: tile.color,
						height: "var(--tile-size)",
						width: "var(--tile-size)",
					}}
				>
					{i}
				</div>
			))}
		</div>
	);
};
