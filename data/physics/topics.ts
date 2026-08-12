import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";
import type { Topic } from "@/types/lab";

// Electricity reuses the Home screen's illustration — no dedicated topic art yet.
export const topics: Topic[] = [
  {
    id: "mechanics",
    title: "Mechanics",
    color: primaryColors.purple,
    image: images.newtonsFirstLawToy,
  },
  {
    id: "electricity",
    title: "Electricity",
    color: primaryColors.orange,
    image: images.homeElectricity,
  },
  {
    id: "waves",
    title: "Waves",
    color: primaryColors.blue,
    image: images.wavesLabIcon,
  },
  {
    id: "optics",
    title: "Optics",
    color: primaryColors.green,
    image: images.opticsLabIcon,
  },
];

export function getTopicById(topicId: Topic["id"]): Topic | undefined {
  return topics.find((topic) => topic.id === topicId);
}