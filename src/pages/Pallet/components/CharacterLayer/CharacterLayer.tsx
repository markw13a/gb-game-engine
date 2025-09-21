import { useEffect } from "react";

import styles from "./CharacterLayer.module.css";
import { preload } from "react-dom";
import type { Direction, SpriteMap } from "../../../../types/sprite";

type CharacterLayerProps = {
	direction: Direction;
	moving: boolean;
	sprites: SpriteMap;
};

export const CharacterLayer = ({
	direction,
	moving,
	sprites,
}: CharacterLayerProps) => {
	const sprite = sprites[moving ? "moving" : "idle"][direction];

	// Prevent flickering image effect by preloading sprites
	useEffect(() => {
		const idleSpriteUrls = Object.values(sprites.idle);
		const movingSpriteUrls = Object.values(sprites.moving);

		const spriteUrls = [...idleSpriteUrls, ...movingSpriteUrls];

		spriteUrls.forEach((url) => {
			preload(url, { as: "image" });
		});
	}, [sprites]);

	return (
		<div className={styles.container}>
			<div
				className={styles.character}
				data-testid="character"
				style={{
					backgroundImage: `url('${sprite}')`,
				}}
			/>
		</div>
	);
};
