import { allLabs as physicsLabs } from "./physics";
import { chemistryLabs } from "./chemistry";
import { biologyLabs } from "./biology";
import type { Lab, LabSubject } from "@/types/lab";

// Cross-subject aggregate for the Labs home screen (which needs to filter,
// search, and feature experiments across Physics, Chemistry, and Biology).
// `data/physics` stays physics-only and untouched — Profile's per-topic
// mastery tracking still reads from it directly.
export const allExperiments: Lab[] = [...physicsLabs, ...chemistryLabs, ...biologyLabs];

export function getExperimentsBySubject(subject: LabSubject): Lab[] {
  return allExperiments.filter((lab) => lab.subject === subject);
}

export function getExperimentById(id: string): Lab | undefined {
  return allExperiments.find((lab) => lab.id === id);
}