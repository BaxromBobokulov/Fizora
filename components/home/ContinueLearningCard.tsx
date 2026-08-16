import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SUBJECT_META } from "@/constants/subjects";
import { useCarouselPaging } from "@/hooks/useCarouselPaging";
import { CarouselDots } from "@/components/shared/CarouselDots";
import type { Lab } from "@/types/lab";

const SCREEN_PADDING = 30; // matches the screen's px-5 (20px) on each side, same convention as FeaturedLabCard
const CARD_HEIGHT = 200;

type ContinueLearningCardProps = {
  labs: Lab[]; // one "next up" lab per subject
  isFirstTimeUser: boolean;
  onPressLab: (lab: Lab) => void;
};

export function ContinueLearningCard({ labs, isFirstTimeUser, onPressLab }: ContinueLearningCardProps) {
  const { cardWidth, activeIndex, handleScrollEnd } = useCarouselPaging(SCREEN_PADDING);

  if (labs.length === 0) return null;

  return (
    <View className="mt-5">
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
          const accentColor = lab.featuredBg ?? subject.color;

          return (
            <View key={lab.id} style={{ width: cardWidth, paddingRight: 5 }}>
              <View
                className="overflow-hidden rounded-[28px] p-6 relative"
                style={{ backgroundColor: `${accentColor}26`, height: CARD_HEIGHT }}
              >
                <View className="w-[65%] z-10">
                  <Text className="text-[12px] font-poppins-medium" style={{ color: accentColor }}>
                    {isFirstTimeUser ? "Start Your First Experiment" : "Continue Learning"}
                  </Text>
                  <Text
                    className="mt-1 font-poppins-bold text-[#0D132B]"
                    style={{ fontSize: 20, lineHeight: 24 }}
                    numberOfLines={2}
                  >
                    {lab.title}
                  </Text>
                  <Text
                    className="mt-2 font-poppins-regular text-text-secondary"
                    style={{ fontSize: 12, lineHeight: 16 }}
                    numberOfLines={2}
                  >
                    {lab.description}
                  </Text>

                  <TouchableOpacity
                    onPress={() => onPressLab(lab)}
                    activeOpacity={0.85}
                    className="mt-5 flex-row items-center gap-1 self-start rounded-full px-5 py-2.5"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Text className="text-[14px] font-poppins-bold text-white">
                      {isFirstTimeUser ? "Start" : "Continue"}
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <Image
                  source={lab.image}
                  className="absolute bottom-2 -right-2 h-36 w-36 z-0"
                  resizeMode="contain"
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      <CarouselDots count={labs.length} activeIndex={activeIndex} />
    </View>
  );
}
