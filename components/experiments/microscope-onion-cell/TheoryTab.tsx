import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import type { MicroscopeSpecimenConfig } from "@/types/microscope";
import { CircleImage } from "./CircleImage";
import { MicroscopeBottomNav } from "./MicroscopeBottomNav";
import { MicroscopeTipCard } from "./MicroscopeTipCard";

const KEY_CONCEPTS = [
  {
    icon: "square-outline" as const,
    title: "Cell Wall",
    description: "A rigid outer layer that provides shape and protection to the cell.",
  },
  {
    icon: "ellipse-outline" as const,
    title: "Cell Membrane",
    description: "A thin, flexible layer inside the cell wall that controls movement of substances in and out of the cell.",
  },
  {
    icon: "aperture-outline" as const,
    title: "Cytoplasm",
    description: "A jelly-like substance where most of the cell's activities occur.",
  },
  {
    icon: "radio-button-on-outline" as const,
    title: "Nucleus",
    description: "The control center of the cell that contains genetic material.",
  },
];

// Simplified from the reference's labeled-diagram-with-leader-lines layout
// to a list, matching the same five parts/descriptions without building a
// bespoke SVG diagram — flagged as a scope trade-off, not an oversight.
const CELL_PARTS = [
  { title: "Cell Wall", description: "Provides shape and support" },
  { title: "Cell Membrane", description: "Regulates what enters and leaves the cell" },
  { title: "Cytoplasm", description: "Site of various cell activities" },
  { title: "Nucleus", description: "Controls the cell and contains DNA" },
  { title: "Vacuole", description: "Stores water and maintains cell turgor" },
];

const APPLICATIONS = [
  { icon: "leaf-outline" as const, label: "Understanding plant growth" },
  { icon: "search-outline" as const, label: "Used in education and research" },
  { icon: "git-network-outline" as const, label: "Helps study cell structure & function" },
];

type TheoryTabProps = {
  specimen: MicroscopeSpecimenConfig;
  accentColor: string;
  accentTint: string;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function TheoryTab({
  specimen,
  accentColor,
  accentTint,
  onPressPrevious,
  onPressNext,
  onStartExperiment,
}: TheoryTabProps) {
  return (
    <View>
      <View className="mt-2 flex-row gap-3 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <View className="flex-1">
          <Text className="text-[14px] font-poppins-bold text-text-primary">Overview</Text>
          <Text
            className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]"
            style={{ color: neutralColors.textSecondary }}
          >
            In this experiment, we observe onion epidermis cells under a microscope. Onion cells are
            plant cells with a clear cell wall, cell membrane, cytoplasm, and nucleus. This helps us
            understand the basic structure of plant cells.
          </Text>
        </View>
        <CircleImage source={specimen.images[400]} size={100} />
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Key Concepts</Text>
      <View className="mt-2 gap-2">
        {KEY_CONCEPTS.map((concept) => (
          <View
            key={concept.title}
            className="flex-row items-start gap-3 rounded-[16px] border p-3"
            style={{ borderColor: neutralColors.border }}
          >
            <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: accentTint }}>
              <Ionicons name={concept.icon} size={16} color={accentColor} />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-poppins-semibold text-text-primary">{concept.title}</Text>
              <Text
                className="text-[12px] font-poppins-regular leading-[18px]"
                style={{ color: neutralColors.textSecondary }}
              >
                {concept.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Stained vs Unstained</Text>
      <View
        className="mt-2 flex-row items-center justify-around rounded-[20px] border p-4"
        style={{ borderColor: neutralColors.border }}
      >
        <View className="items-center gap-2">
          <Text className="text-[11px] font-poppins-semibold" style={{ color: neutralColors.textSecondary }}>
            Unstained Cell
          </Text>
          <CircleImage source={specimen.images[400]} size={110} />
        </View>
        <View className="items-center gap-2">
          <Text className="text-[11px] font-poppins-semibold" style={{ color: neutralColors.textSecondary }}>
            Stained (Iodine)
          </Text>
          <CircleImage source={specimen.images[400]} size={110} tintColor={primaryColors.purple} tintOpacity={0.4} />
        </View>
      </View>
      <Text className="mt-2 text-center text-[12px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
        Staining helps in better visibility of cell components.
      </Text>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Parts of an Onion Cell</Text>
      <View className="mt-2 gap-1.5 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        {CELL_PARTS.map((part) => (
          <View key={part.title} className="flex-row items-center gap-2">
            <View className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <Text className="text-[13px] font-poppins-semibold text-text-primary">{part.title}</Text>
            <Text className="text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
              – {part.description}
            </Text>
          </View>
        ))}
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Real World Applications</Text>
      <View className="mt-2 flex-row gap-2">
        {APPLICATIONS.map((application) => (
          <View
            key={application.label}
            className="flex-1 items-center gap-2 rounded-[16px] border p-3"
            style={{ borderColor: neutralColors.border }}
          >
            <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: accentTint }}>
              <Ionicons name={application.icon} size={16} color={accentColor} />
            </View>
            <Text className="text-center text-[11px] font-poppins-medium text-text-primary" numberOfLines={3}>
              {application.label}
            </Text>
          </View>
        ))}
      </View>

      <MicroscopeTipCard
        tip="Adjust the focus and light properly for the clearest view of cell structures."
        accentTint={accentTint}
      />

      <MicroscopeBottomNav
        ctaLabel="Start Experiment"
        ctaIcon="play"
        accentColor={accentColor}
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
