import type { ImageSourcePropType } from "react-native";

export type LabTopicId = "mechanics" | "electricity" | "waves" | "optics";

export type LabDimension = "2d" | "3d";

export type LabDifficulty = "beginner" | "intermediate" | "advanced";

export type LabParameter = {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
};

export type Lab = {
  id: string;
  topic: LabTopicId;
  title: string;
  description: string;
  dimension: LabDimension;
  difficulty: LabDifficulty;
  durationMinutes: number;
  image: ImageSourcePropType;
  parameters: LabParameter[];
};

export type Topic = {
  id: LabTopicId;
  title: string;
  color: string;
  image: ImageSourcePropType;
};