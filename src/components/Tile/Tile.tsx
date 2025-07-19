type TileProps = {
    color: string;
    label: string;
    size: number;
};

export const Tile = ({ color, label, size }: TileProps) => {
    return (
        <div style={{ backgroundColor: color, width: size, height: size }}>
            {label}
        </div>
    );
};