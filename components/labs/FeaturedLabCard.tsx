import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColors } from "@/constants/theme/colors";
import { SUBJECT_META } from "@/constants/subjects";
import { useCarouselPaging } from "@/hooks/useCarouselPaging";
import { CarouselDots } from "@/components/shared/CarouselDots";
import type { Lab } from "@/types/lab";
import { CategoryIcon } from "./CategoryIcon";
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
  const { cardWidth, activeIndex, handleScrollEnd } = useCarouselPaging(SCREEN_PADDING);

  if (labs.length === 0) return null;

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
          const subject = SUBJECT_META[lab.subject];
          const cardBg = `${lab.featuredBg ?? subject.color}26`;
          const status = getStatus(lab.id);

          return (
            <View key={lab.id} style={{ width: cardWidth, paddingRight: 5 }}>
              <View
                className="overflow-hidden rounded-[28px] p-6 relative"
                style={{ backgroundColor: cardBg, height: CARD_HEIGHT }}
              >
                <View className="w-[65%] z-10">
                  <View className="flex-row flex-wrap items-center gap-1.5">
                    <CategoryIcon topic={lab.subject} size={13} color={subject.color} />
                    <Text className="text-[12px] font-poppins-medium" style={{ color: subject.color }}>
                      {subject.label}
                    </Text>
                    <LabStatusBadge status={status} />
                  </View>

                  <Text
                    className="mt-1 font-poppins-bold text-[#0D132B]"
                    style={{ fontSize: 17, lineHeight: 21, height: 42 }}
                    numberOfLines={2}
                  >
                    {lab.title}
                  </Text>
                  <Text
                    className="mt-2 font-poppins-regular text-text-secondary"
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

                <View className="absolute bottom-4 right-4 z-10 flex-row items-center gap-1 rounded-full bg-white/70 px-3 py-1.5">
                  <Ionicons name="time-outline" size={12} color={subject.color} />
                  <Text className="text-[11px] font-poppins-bold text-[#0D132B]">
                    {lab.durationMinutes} min
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <CarouselDots count={labs.length} activeIndex={activeIndex} />
    </View>
  );
}