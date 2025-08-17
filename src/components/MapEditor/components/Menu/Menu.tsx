import styles from './Menu.module.css';

type MenuProps<T> = {
    width: number;
    height: number;
    onWidthChange: (width: number) => void;
    onHeightChange: (height: number) => void;
    tileOptions: T[];
    brush: T;
    output: string;
    onBrushChange: (brush: T) => void;
    getTileLabel: (tile: T) => string;
    getTileImgSrc: (tile: T) => string;
    // getTileSymbol: (tile: T) => string;
}

export const Menu = <T, >({
    width,
    height,
    onWidthChange,
    onHeightChange,
    tileOptions,
    brush,
    output,
    onBrushChange,
    getTileLabel,
    getTileImgSrc,
}: MenuProps<T>) => {
    return (
        <div className={styles.container}>
            <div className={styles.tilesContainer}>
                <div className={styles.header}>
                    Selected: {"\n"}
                    {brush ? getTileLabel(brush) : 'None'} 
                </div>
                <div className={styles.tiles}>
                    {tileOptions.map(tile => (
                        <button className={styles.tile} aria-label={`Select ${getTileLabel(tile)} brush`} onClick={() => onBrushChange(tile)}>
                            <img alt={getTileLabel(tile)} src={getTileImgSrc(tile)} />
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.controls}>
                <label className={styles.control}>
                    Width (tiles) <input type="number" onChange={e => onWidthChange(parseInt(e.target.value))} value={width} />
                </label>
                <label className={styles.control}>
                    Height (tiles) <input type="number" onChange={e => onHeightChange(parseInt(e.target.value))} value={height} />
                </label>
            </div>
            <div className={styles.outputContainer}>
                <label className={styles.control}>
                    Output
                    <textarea readOnly value={output} />
                </label>
            </div>
        </div>
    );
};