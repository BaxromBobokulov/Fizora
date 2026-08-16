import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from "react-native";

// Shared paging math for the app's horizontal card carousels (Labs' Featured
// Lab card, Home's Continue Learning card) — one card per screen width minus
// side padding, snapping to the nearest card on scroll end.
export function useCarouselPaging(screenPadding: number) {
  const { width } = useWindowDimensions();
  const cardWidth = width - screenPadding;
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
  }

  return { cardWidth, activeIndex, handleScrollEnd };
}
