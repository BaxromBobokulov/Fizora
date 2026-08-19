// Shared SVG canvas coordinates for the titration apparatus (stand, burette,
// flask). Kept in one place so RingStand/Burette/ErlenmeyerFlask stay
// pixel-aligned without each component guessing at the others' geometry.

export const CANVAS_WIDTH = 260;
export const CANVAS_HEIGHT = 360;

export const BURETTE_X = 118;
export const BURETTE_WIDTH = 34;
export const BURETTE_CENTER_X = BURETTE_X + BURETTE_WIDTH / 2;
export const BURETTE_TOP_Y = 40;
export const BURETTE_BOTTOM_Y = 210;
export const STOPCOCK_BOTTOM_Y = 228;
export const DROPPER_TIP_Y = 248;

export const FLASK_NECK_TOP_Y = 250;
export const FLASK_NECK_BOTTOM_Y = 268;
export const FLASK_NECK_HALF_WIDTH = 10;
export const FLASK_BASE_Y = 330;
export const FLASK_BASE_HALF_WIDTH = 40;

export const STIR_PLATE_Y = FLASK_BASE_Y;
export const STIR_PLATE_HEIGHT = 14;

export const STAND_POLE_X = 55;
export const STAND_BASE_Y = 338;
export const CLAMP_Y = 58;
