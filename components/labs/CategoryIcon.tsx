import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Ellipse } from "react-native-svg";

import type { LabSubject } from "@/types/lab";

export type CategoryIconTopic = "all" | LabSubject | "saved";

type CategoryIconProps = {
  topic: CategoryIconTopic;
  size: number;
  color: string;
};

export function CategoryIcon({ topic, size, color }: CategoryIconProps) {
  switch (topic) {
    case "all":
      return <Ionicons name="grid" size={size} color={color} />;
    case "physics":
      return <AtomIcon size={size} color={color} />;
    case "chemistry":
      return <Ionicons name="flask" size={size} color={color} />;
    case "biology":
      return <Ionicons name="leaf" size={size} color={color} />;
    case "saved":
      return <Ionicons name="bookmark" size={size} color={color} />;
  }
}

// Three overlapping orbit rings + a center dot — echoes the atom motif used
// elsewhere in the Labs header (see HeaderMascot's AtomAccent).
function AtomIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.6" fill="none" />
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        rotation="60"
        origin="12, 12"
      />
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        rotation="120"
        origin="12, 12"
      />
      <Circle cx="12" cy="12" r="1.8" fill={color} />
    </Svg>
  );
}