import type { ImageSourcePropType } from "react-native";

export type MicroscopeMagnification = 100 | 400 | 1000;

export type MicroscopeTool = "cursor" | "pencil" | "camera";

// Per-specimen data for a lab that renders the microscope viewport (image
// swapping/blur/overlay/transform only — no physics engine). Lives on the
// Lab entry itself since only microscope labs need it.
export type MicroscopeSpecimenConfig = {
  specimenLabel: string;
  idealFocus: number; // 0-100, same scale as useMicroscopeStore's `focus`
  images: Record<MicroscopeMagnification, ImageSourcePropType>;
};
