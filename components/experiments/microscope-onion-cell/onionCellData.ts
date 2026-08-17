import type { MicroscopeMagnification } from "@/types/microscope";

// Procedural onion-epidermis cell grid — pure data generation, no rendering.
// Kept isolated from OnionCellGrid.tsx/Granule.tsx so a future matter.js-based
// Brownian-motion upgrade can swap the animation layer without touching the
// cell-shape generation here.

export type OnionCellNucleus = { cx: number; cy: number; rx: number; ry: number };
export type OnionCellGranule = { baseX: number; baseY: number; seed: number };

export type OnionCell = {
  id: string;
  points: string; // SVG polygon "x1,y1 x2,y2 ..."
  nucleus: OnionCellNucleus | null;
  granules: OnionCellGranule[];
  detailed: boolean; // draws the faint inset "wall texture" stroke when true (1000x only)
};

export type OnionGrid = {
  cells: OnionCell[];
  worldSize: number;
};

type MagnificationConfig = {
  cellWidth: number;
  cellHeight: number;
  showDetail: boolean;
  granuleCount: number;
  showWallTexture: boolean;
};

const MAGNIFICATION_CONFIG: Record<MicroscopeMagnification, MagnificationConfig> = {
  100: { cellWidth: 60, cellHeight: 42, showDetail: false, granuleCount: 0, showWallTexture: false },
  400: { cellWidth: 110, cellHeight: 75, showDetail: true, granuleCount: 3, showWallTexture: false },
  1000: { cellWidth: 220, cellHeight: 150, showDetail: true, granuleCount: 5, showWallTexture: true },
};

// Cheap deterministic hash -> [0, 1). Same seed always yields the same value,
// so cell shapes/nucleus placement stay stable across re-renders instead of
// re-randomizing (and visibly jumping) on every render.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function jitter(seed: number, amount: number): number {
  return (seededRandom(seed) - 0.5) * amount;
}

function cellPolygonPoints(x: number, y: number, w: number, h: number, seed: number): string {
  const j = Math.min(w, h) * 0.1;
  const points = [
    { x: x + jitter(seed + 0.11, j), y: y + jitter(seed + 0.23, j) },
    { x: x + w + jitter(seed + 0.37, j), y: y + jitter(seed + 0.41, j) },
    { x: x + w + jitter(seed + 0.59, j), y: y + h + jitter(seed + 0.67, j) },
    { x: x + jitter(seed + 0.79, j), y: y + h + jitter(seed + 0.83, j) },
  ];
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

export function generateOnionCellGrid(
  magnification: MicroscopeMagnification,
  worldSize: number
): OnionGrid {
  const config = MAGNIFICATION_CONFIG[magnification];
  const cols = Math.ceil(worldSize / config.cellWidth) + 2;
  const rows = Math.ceil(worldSize / config.cellHeight) + 2;
  const cells: OnionCell[] = [];

  for (let row = -1; row < rows; row++) {
    // Classic brick coursing: every other row is offset by half a cell width.
    const rowOffset = row % 2 === 0 ? 0 : config.cellWidth / 2;

    for (let col = -1; col < cols; col++) {
      const seed = row * 1000 + col * 7 + magnification / 100;
      const x = col * config.cellWidth + rowOffset - config.cellWidth / 2;
      const y = row * config.cellHeight - config.cellHeight / 2;
      const w = config.cellWidth + jitter(seed + 0.13, config.cellWidth * 0.06);
      const h = config.cellHeight + jitter(seed + 0.29, config.cellHeight * 0.06);

      const nucleus: OnionCellNucleus | null = config.showDetail
        ? {
            cx: x + w * (0.32 + seededRandom(seed + 0.31) * 0.32),
            cy: y + h * (0.32 + seededRandom(seed + 0.53) * 0.32),
            rx: w * 0.15,
            ry: h * 0.17,
          }
        : null;

      const granules: OnionCellGranule[] = [];
      if (nucleus) {
        for (let i = 0; i < config.granuleCount; i++) {
          const gSeed = seed * 13 + i * 17.3;
          granules.push({
            baseX: nucleus.cx + jitter(gSeed + 0.17, w * 0.4),
            baseY: nucleus.cy + jitter(gSeed + 0.61, h * 0.4),
            seed: gSeed,
          });
        }
      }

      cells.push({
        id: `${magnification}-${row}-${col}`,
        points: cellPolygonPoints(x, y, w, h, seed),
        nucleus,
        granules,
        detailed: config.showWallTexture,
      });
    }
  }

  return { cells, worldSize };
}
