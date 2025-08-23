import { useState } from 'react';
import styles from './Menu.module.css';
import { Button } from '@/components/Button/Button';
import { ImportMapModal } from '../ImportMapModal/ImportMapModal';

type MenuProps<T> = {
    width: number;
    height: number;
    onWidthChange: (width: number) => void;
    onHeightChange: (height: number) => void;
    onOutputChange: (tiles: T[]) => void;
    tileOptions: T[];
    brush: T | undefined;
    output: string;
    onBrushChange: (brush: T) => void;
    getBrushLabel: (tile: T) => string;
    getBrushImgSrc: (tile: T) => string;
    getTileFromSymbol: (symbol: string) => T | undefined;
}

export const Menu = <T, >({
    width,
    height,
    onWidthChange,
    onHeightChange,
    onOutputChange,
    tileOptions,
    brush,
    output,
    onBrushChange,
    getBrushLabel,
    getBrushImgSrc,
    getTileFromSymbol
}: MenuProps<T>) => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    
    const onImport = (width: number, height: number, mapString: string) => {
        const nextOutput = mapString.split('').map(getTileFromSymbol);
        
        // TODO: Appropriate errors in the modal...
        if (nextOutput.includes(undefined)) {
            return;
        }

        onWidthChange(width);
        onHeightChange(height);
        // @ts-ignore TS assumes nextOutput can contain undefined, but we've guarded against this
        onOutputChange(nextOutput);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.tilesContainer}>
                    <div className={styles.header}>
                        Selected: {"\n"}
                        {brush ? getBrushLabel(brush) : 'None'} 
                    </div>
                    <div className={styles.tiles}>
                        {tileOptions.map(tile => (
                            <button className={styles.tile} aria-label={`Select ${getBrushLabel(tile)} brush`} onClick={() => onBrushChange(tile)}>
                                <img alt={getBrushLabel(tile)} src={getBrushImgSrc(tile)} />
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
                <div>
                    <Button onClick={() => setIsImportModalOpen(true)}>
                        Import
                    </Button>
                </div>
            </div>
            <ImportMapModal 
                isOpen={isImportModalOpen} 
                onClose={() => setIsImportModalOpen(false)} 
                onImport={onImport} 
            />
        </>
    );
};