import { useEffect, useState } from "react";
import styles from './MapEditor.module.css';
import { Menu } from "./components/Menu/Menu";
import { Map } from "./components/Map/Map";

type MapEditorProps<T> = {
    tileSize: string;
    tileOptions: T[];
    getTileSymbol: (tile: T | undefined) => string;
    getTileFromSymbol: (symbol: string) => T | undefined;
    getTileLabel: (tile: T) => string;
    getTileImgSrc: (tile: T) => string;
}

export const MapEditor = <T,>({ tileSize, tileOptions, getTileSymbol, getTileLabel, getTileImgSrc, getTileFromSymbol }: MapEditorProps<T>) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [output, setOutput] = useState<T[]>([]);

    const [brush, setBrush] = useState<T>();

    const onTileClick = (index: number) => {
        if (!brush) {
            return;
        }

        // TODO: Could perform very poorly for a large array
        const nextOutput = [...output];
        nextOutput[index] = brush;

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
        <div className={styles.container}>
            <Map
                width={width}
                height={height}
                tileSize={tileSize}
                tiles={output}
                getTileLabel={getTileLabel}
                getTileImgSrc={getTileImgSrc}
                onClickTile={(i) => onTileClick(i)}
            />
            <Menu
                width={width}
                height={height}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onOutputChange={setOutput}
                tileOptions={tileOptions}
                brush={brush}
                mapString={output.reduce((str, tile) => str + getTileSymbol(tile), '')}
                onBrushChange={setBrush}
                getBrushLabel={(t) => t ? getTileLabel(t) : ''}
                getBrushImgSrc={(t) => t ? getTileImgSrc(t) : ''}
                getTileFromSymbol={getTileFromSymbol}
            />
        </div>
    );
}