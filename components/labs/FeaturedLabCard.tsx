import { useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColors } from "@/constants/theme/colors";
import { getTopicById } from "@/data/physics";
import type { Lab } from "@/types/lab";
import { LabStatusBadge, type LabStatus } from "./LabStatusBadge";

const SCREEN_PADDING = 30; // matches the screen's px-5 (20px) on each side

// Fixed so every card in the carousel is identical regardless of title/
// description length — sized for the worst-case content (a 2-line title like
// "Capacitor Charging & Discharging" + a 2-line description) plus padding.
const CARD_HEIGHT = 200;

type FeaturedLabCardProps = {
  labs: Lab[];
  getStatus: (labId: string) => LabStatus;
  onPressLab: (lab: Lab) => void;
};

export function FeaturedLabCard({ labs, getStatus, onPressLab }: FeaturedLabCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - SCREEN_PADDING;
  const [activeIndex, setActiveIndex] = useState(0);

  if (labs.length === 0) return null;

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
  }

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        snapToInterval={cardWidth}
        decelerationRate="fast"
      >
        {labs.map((lab) => {
          const topic = getTopicById(lab.topic);
          const status = getStatus(lab.id);

          return (
            <View key={lab.id} style={{ width: cardWidth, paddingRight: 5}}>
              <View
                className="overflow-hidden rounded-[28px] p-6 relative"
                style={{ backgroundColor: primaryColors.purple, height: CARD_HEIGHT }}
              >
                <View className="w-[65%] z-10">
                  <View className="flex-row flex-wrap items-center gap-2">
                    <Text className="text-[12px] font-poppins-medium text-white/80">
                      {topic?.title ?? "Physics"}
                    </Text>
                    <LabStatusBadge status={status} />
                  </View>

                  <Text
                    className="mt-1 font-poppins-bold text-white"
                    style={{ fontSize: 17, lineHeight: 21, height: 42 }}
                    numberOfLines={2}
                  >
                    {lab.title}
                  </Text>
                  <Text
                    className="mt-2 font-poppins-regular text-white/80"
                    style={{ fontSize: 12, lineHeight: 16, height: 32 }}
                    numberOfLines={2}
                  >
                    {lab.description}
                  </Text>

                  <TouchableOpacity
                    onPress={() => onPressLab(lab)}
                    activeOpacity={0.85}
                    className="mt-5 flex-row items-center gap-1 self-start rounded-full bg-white px-5 py-2.5"
                  >
                    <Text
                      className="text-[14px] font-poppins-bold"
                      style={{ color: primaryColors.purple }}
                    >
                      Start Experiment
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color={primaryColors.purple} />
                  </TouchableOpacity>
                </View>

                {/* Bleeds slightly past the card's right edge, same floating-illustration
                    treatment as the Home screen's Continue Experiment card. */}
                <Image
                  source={lab.image}
                  className="absolute bottom-2 -right-2 h-36 w-36 z-0"
                  resizeMode="contain"
                />

                <View className="absolute bottom-4 right-4 z-10 flex-row items-center gap-1 rounded-full bg-black/30 px-3 py-1.5">
                  <Ionicons name="time-outline" size={12} color="#FFFFFF" />
                  <Text className="text-[11px] font-poppins-bold text-white">
                    {lab.durationMinutes} min
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {labs.length > 1 && (
        <View className="mt-3 flex-row items-center justify-center gap-1.5">
          {labs.map((lab, index) => (
            <View
              key={lab.id}
              className="rounded-full"
              style={{
                width: index === activeIndex ? 18 : 6,
                height: 6,
                backgroundColor: index === activeIndex ? primaryColors.purple : "#E5E7EB",
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}