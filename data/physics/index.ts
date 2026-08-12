import { mechanicsLabs } from "./mechanics";
import { electricityLabs } from "./electricity";
import { wavesLabs } from "./waves";
import { opticsLabs } from "./optics";
import type { Lab, LabTopicId } from "@/types/lab";

export { topics, getTopicById } from "./topics";

export const allLabs: Lab[] = [
  ...mechanicsLabs,
  ...electricityLabs,
  ...wavesLabs,
  ...opticsLabs,
];

export function getLabsByTopic(topicId: LabTopicId): Lab[] {
  return allLabs.filter((lab) => lab.topic === topicId);
}

export function getLabById(labId: string): Lab | undefined {
  return allLabs.find((lab) => lab.id === labId);
}