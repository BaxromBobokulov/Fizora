import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  index: { active: "home", inactive: "home-outline" },
  labs: { active: "flask", inactive: "flask-outline" },
  chat: { active: "chatbubble-ellipses", inactive: "chatbubble-ellipses-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

const TAB_HEIGHT = 56;
const CIRCLE_SIZE = 48;
const FADE_DURATION = 220;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useSharedValue(0);
  const hasPositioned = useRef(false);

  useEffect(() => {
    if (!tabWidth) return;

    const target = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;

    if (!hasPositioned.current) {
      // Snap into place on the first measurement instead of sliding in from 0.
      translateX.value = target;
      hasPositioned.current = true;
      return;
    }

    translateX.value = withSpring(target, { damping: 16, stiffness: 160, mass: 0.9 });
  }, [state.index, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Measured on the padding-free row so this lines up exactly with the flex
  // width each Pressable gets — an absolutely positioned child ignores the
  // parent's padding, so measuring the padded bar itself drifts the circle
  // further off-center the further right the active tab is.
  const onRowLayout = (event: LayoutChangeEvent) => {
    setTabWidth(event.nativeEvent.layout.width / state.routes.length);
  };

  const activeRouteName = state.routes[state.index].name;
  const activeIcon = TAB_ICONS[activeRouteName]?.active ?? "ellipse";

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-0 left-0 right-0 items-center px-5"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <View
        className="w-full rounded-3xl bg-white px-2"
        style={{
          shadowColor: "#0D132B",
          shadowOpacity: 0.12,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
        }}
      >
        <View className="flex-row" onLayout={onRowLayout}>
          {tabWidth > 0 && (
            <Animated.View
              pointerEvents="none"
              className="absolute items-center justify-center rounded-full"
              style={[
                {
                  top: (TAB_HEIGHT - CIRCLE_SIZE) / 2,
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  backgroundColor: primaryColors.purple,
                },
                indicatorStyle,
              ]}
            >
              {/* Nested inside the circle and flex-centered, so it can never
                  drift out of alignment the way a separately positioned icon could. */}
              <Ionicons name={activeIcon} size={22} color="#FFFFFF" />
            </Animated.View>
          )}

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = typeof options.title === "string" ? options.title : route.name;
            const isFocused = state.index === index;
            const icon = TAB_ICONS[route.name]?.inactive ?? "ellipse-outline";

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabBarButton
                key={route.key}
                icon={icon}
                label={label}
                isFocused={isFocused}
                onPress={onPress}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

type TabBarButtonProps = {
  icon: IconName;
  label: string;
  isFocused: boolean;
  onPress: () => void;
};

function TabBarButton({ icon, label, isFocused, onPress }: TabBarButtonProps) {
  // The gray icon+label fades out as the active tab's slot is covered by the
  // sliding purple circle, and fades back in once it's no longer focused.
  const contentStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 0 : 1, {
      duration: FADE_DURATION,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      className="flex-1 items-center justify-center"
      style={{ height: TAB_HEIGHT }}
    >
      <Animated.View style={[{ alignItems: "center" }, contentStyle]}>
        <Ionicons name={icon} size={22} color={neutralColors.textSecondary} />
        <Text className="mt-1 text-caption font-poppins-medium text-text-secondary">{label}</Text>
      </Animated.View>
    </Pressable>
  );
}
