import { Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Ellipse } from "react-native-svg";

import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";

// Subtle orbit-ring accent that echoes the atom motif next to Tulki in the
// design reference — three overlapping rings plus a center dot.
function AtomAccent({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke={primaryColors.purple}
        strokeWidth="1.2"
        fill="none"
      />
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke={primaryColors.purple}
        strokeWidth="1.2"
        fill="none"
        rotation="60"
        origin="12, 12"
      />
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke={primaryColors.purple}
        strokeWidth="1.2"
        fill="none"
        rotation="120"
        origin="12, 12"
      />
      <Circle cx="12" cy="12" r="1.6" fill={primaryColors.purple} />
    </Svg>
  );
}

// Small "+" accents scattered around the mascot, matching the design's
// scattered plus marks. Kept low-opacity so they read as background texture.
//
// The wrapper keeps its original h-24 w-24 layout footprint (so it doesn't
// push the search bar down), while the image itself renders larger and
// top-aligned + centered, letting it visually overflow past the wrapper's
// bottom edge and hang over the search bar below — matching the design.
// zIndex keeps it painting above the search bar instead of behind it.
export function HeaderMascot() {
  return (
    <View className="h-24 w-24 items-center" style={{ zIndex: 10 }}>
      <View className="absolute -left-3 -top-3 opacity-40">
        <Ionicons name="add" size={14} color={primaryColors.purple} />
      </View>
      <View className="absolute -right-2 top-3 opacity-30">
        <Ionicons name="add" size={12} color={primaryColors.purple} />
      </View>
      <View className="absolute -right-1 bottom-2 opacity-30">
        <Ionicons name="add" size={12} color={primaryColors.purple} />
      </View>
      <View className="absolute -left-4 top-11 opacity-30">
        <AtomAccent size={22} />
      </View>

      <Image source={images.tulkiLabsHeader} className="h-31 w-56 mr-20" resizeMode="contain" />
    </View>
  );
}