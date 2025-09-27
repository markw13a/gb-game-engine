import { createLazyRoute } from "@tanstack/react-router";
import { MapEditor } from "../MapEditor";
// TODO: Should really be shared folder...
import { TILE_DATA, TILES } from "@/pages/Pallet/constants/symbols";

const Component = () => (
    <MapEditor 
        tileOptions={TILE_DATA}
        tileSize="32px"
        getTileSymbol={(tile) => tile.type}
        getTileFromSymbol={(symbol) => TILES[symbol]}
        getTileLabel={(tile) => tile.label}
        getTileImgSrc={(tile) => tile.sprite}
    />
)

export const Route = createLazyRoute('/')({ component: Component })