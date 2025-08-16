import { useEffect, useState } from "react";
import styles from './MapEditor.module.css';

type MapEditorProps<T> = {
    tileSize: string;
    availableTiles: T[];
    getTileSymbol: (tile: T) => string;
    getTileLabel: (tile: T) => string;
    getTileImgSrc: (tile: T) => string;
}

export const MapEditor = <T,>({ tileSize, availableTiles, getTileSymbol, getTileLabel, getTileImgSrc }: MapEditorProps<T>) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [output, setOutput] = useState<T[]>([]);

    const [selectedTileBrush, setSelectedTileBrush] = useState<T>();

    const onTileClick = (index: number) => {
        if (!selectedTileBrush) {
            return;
        }

        // TODO: Could perform very poorly for a large array
        const nextOutput = [...output];
        nextOutput[index] = selectedTileBrush;

        setOutput(nextOutput);
    }

    // TODO: Need to handle what happens when height/width changed while editing map
    // Updating an existing map much harder than making one from scratch!
    useEffect(() => {
        const mapSizeInTiles = width * height;

        if (mapSizeInTiles === 0 || Number.isNaN(mapSizeInTiles)) {
            return;
        }

        const blankMap = new Array(width * height).fill(null);
        setOutput(blankMap);
    }, [width, height])

    // TODO: Can/should we repurpose map for rendering tiles here? Not sure, think this is potentially very simple
    // Render width x height number of tiles, set grid properties accordingly
    // If no img or whatever available for the select tile, display an empty tile placeholder
    // Click on the tile updates it to match whatever the selected 'brush' is
    return (
        <div>
            <div className={styles.container}>
                <div 
                    className={styles.map} 
                    style={{ 
                        gridTemplateColumns: `repeat(${width}, ${tileSize})`, 
                        gridTemplateRows: `repeat(${height}, ${tileSize})`
                    }}
                >
                    {output.map((tile, index) => tile === null ? (
                        <div aria-label="Empty tile" className={styles.emptyTile} style={{ width: tileSize, height: tileSize }} onClick={() => onTileClick(index)} /> 
                    ) : (
                        <div aria-label={`${getTileLabel(tile)} tile`} className={styles.tile} style={{ width: tileSize, height: tileSize }} onClick={() => onTileClick(index)}>
                            <img src={getTileImgSrc(tile)} style={{ width: '100%', height: '100%' }} />
                        </div>
                    ))}
                </div>
                <div className={styles.tileSelector}>
                    <div>
                        Selected: {selectedTileBrush ? getTileLabel(selectedTileBrush) : 'None'} 
                    </div>
                    {availableTiles.map(tile => (
                        <button aria-label={`Select ${getTileLabel(tile)} brush`} onClick={() => setSelectedTileBrush(tile)}>
                            <img alt={getTileLabel(tile)} src={getTileImgSrc(tile)} />
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerControls}>
                    <label>
                        Width <input type="number" onChange={e => setWidth(parseInt(e.target.value))} value={width} />
                    </label>
                    <label>
                        Height <input type="number" onChange={e => setHeight(parseInt(e.target.value))} value={height} />
                    </label>
                </div>
                {/* <div>
                    <textarea readOnly value={output.reduce((out, tile) => out + getTileSymbol(tile), '')} />
                </div> */}
            </div>
        </div>
    );
}