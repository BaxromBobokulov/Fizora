import { Text, View } from "react-native";

import { neutralColors } from "@/constants/theme/colors";
import { BURETTE_CAPACITY_ML } from "./titrationMath";

type BuretteReadingPanelProps = {
  buretteVolumeML: number;
  accentColor: string;
};

const TICK_COUNT = 4;

// Digital mL readout + a small zoomed-in ruler around the current level —
// the "11-14 mL" style scale from the reference, recomputed around whatever
// the current reading actually is rather than a fixed 11-14 window. Clamped
// to the burette's real 0-50 mL range so the window never shows a tick below
// 0 or above capacity.
export function BuretteReadingPanel({ buretteVolumeML, accentColor }: BuretteReadingPanelProps) {
  let topTick = Math.min(BURETTE_CAPACITY_ML, Math.ceil(buretteVolumeML) + 1);
  topTick = Math.max(topTick, TICK_COUNT);
  const bottomTick = topTick - TICK_COUNT;
  const ticks = Array.from({ length: TICK_COUNT }, (_, index) => topTick - index);
  const fillPercent = Math.min(100, Math.max(0, ((buretteVolumeML - bottomTick) / TICK_COUNT) * 100));

  return (
    <View className="w-24 items-center rounded-[16px] bg-white p-3">
      <Text className="text-[10px] font-poppins-medium text-center" style={{ color: neutralColors.textSecondary }}>
        Burette Reading
      </Text>
      <Text className="mt-1 text-[19px] font-poppins-bold" style={{ color: accentColor }}>
        {buretteVolumeML.toFixed(2)}
      </Text>
      <Text className="text-[10px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
        mL
      </Text>

      <View className="mt-3 flex-row items-stretch" style={{ height: 90 }}>
        <View className="mr-2 justify-between">
          {ticks.map((tick) => (
            <Text
              key={tick}
              className="text-[10px] font-poppins-medium"
              style={{ color: neutralColors.textSecondary }}
            >
              {tick}
            </Text>
          ))}
        </View>
        <View className="w-3 overflow-hidden rounded-full" style={{ backgroundColor: neutralColors.border }}>
          <View
            className="absolute bottom-0 w-3 rounded-full"
            style={{ height: `${fillPercent}%`, backgroundColor: accentColor }}
          />
        </View>
      </View>
    </View>
  );
}
