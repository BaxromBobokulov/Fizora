import { View } from "react-native";

import { primaryColors } from "@/constants/theme/colors";

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
};

export function CarouselDots({ count, activeIndex }: CarouselDotsProps) {
  if (count <= 1) return null;

  return (
    <View className="mt-3 flex-row items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          className="rounded-full"
          style={{
            width: index === activeIndex ? 18 : 6,
            height: 6,
            backgroundColor: index === activeIndex ? primaryColors.purple : "#E5E7EB",
          }}
        />
      ))}
    </View>
  );
}
