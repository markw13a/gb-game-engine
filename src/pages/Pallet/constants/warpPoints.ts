import type { WarpPoint } from "@/types/map";

// NB: There's no protection against a warp-point referencing a map position that doesn't exist
export const warpPoints: WarpPoint[] = [{ from: [298, 340], to: 432 }];

export const getWarpPointAtTile = (tile: number, warpPoints: WarpPoint[]) =>
	warpPoints.find((wp) => wp.from.includes(tile))?.to;
