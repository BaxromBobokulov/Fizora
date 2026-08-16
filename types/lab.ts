import type { ImageSourcePropType } from "react-native";

export type LabSubject = "physics" | "chemistry" | "biology";

// Sub-topic/category within a subject. Kept per-subject so a wrong pairing
// (e.g. a chemistry lab tagged "mechanics") fails at compile time.
export type PhysicsTopicId = "mechanics" | "electricity" | "waves" | "optics";
export type ChemistryTopicId =
  | "reactions"
  | "matter-states"
  | "acids-bases"
  | "bonding"
  | "elements";
export type BiologyTopicId =
  | "cells"
  | "human-body"
  | "genetics"
  | "ecology"
  | "plants";

export type LabTopicId = PhysicsTopicId | ChemistryTopicId | BiologyTopicId;

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
  subject: LabSubject;
  topic: LabTopicId;
  title: string;
  description: string;
  dimension: LabDimension;
  difficulty: LabDifficulty;
  durationMinutes: number;
  image: ImageSourcePropType;
  parameters: LabParameter[];
  // Overrides the subject's brand color as this lab's Featured Lab card
  // background — e.g. Build a Plant Cell uses green to match its plant/cell
  // illustration even though Biology's brand color is purple.
  featuredBg?: string;
};

export type Topic = {
  id: LabTopicId;
  title: string;
  color: string;
  image: ImageSourcePropType;
};