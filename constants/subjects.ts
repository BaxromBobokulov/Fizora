import type { ImageSourcePropType } from "react-native";

import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";
import type { LabSubject } from "@/types/lab";

export type SubjectMeta = {
  id: LabSubject;
  label: string;
  description: string;
  color: string;
  tileBackground: string;
  icon: ImageSourcePropType;
};

export const SUBJECT_META: Record<LabSubject, SubjectMeta> = {
  chemistry: {
    id: "chemistry",
    label: "Chemistry",
    description: "Mix, react and discover the world of chemicals.",
    color: primaryColors.purple,
    tileBackground: `${primaryColors.purple}14`,
    icon: images.chemistryIcon,
  },
  biology: {
    id: "biology",
    label: "Biology",
    description: "Understand life through hands-on activities.",
    color: primaryColors.green,
    tileBackground: `${primaryColors.green}14`,
    icon: images.biologyIcon,
  },
  physics: {
    id: "physics",
    label: "Physics",
    description: "Learn the laws that govern our universe.",
    color: primaryColors.orange,
    tileBackground: `${primaryColors.orange}14`,
    icon: images.physicsIcon,
  },
};

// Order for the category filter pills (All, Physics, Chemistry, Biology, Saved).
export const SUBJECT_ORDER: LabSubject[] = ["physics", "chemistry", "biology"];

// Order for the "Explore by Subject" cards, matching the design reference.
export const EXPLORE_SUBJECT_ORDER: LabSubject[] = ["chemistry", "biology", "physics"];