import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import type { PendulumRun } from "@/store/usePendulumExperimentStore";

type RunsDataTableProps = {
  runs: PendulumRun[];
};

const COLUMNS = ["No.", "Length (m)", "Period (s)", "Frequency (Hz)"];

export function RunsDataTable({ runs }: RunsDataTableProps) {
  if (runs.length === 0) {
    return (
      <View className="mt-3 items-center rounded-[20px] border border-dashed p-6" style={{ borderColor: neutralColors.border }}>
        <Text className="text-center text-[12px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          No runs recorded yet. Play the experiment at a few different lengths to build your data table.
        </Text>
      </View>
    );
  }

  const sortedRuns = [...runs].sort((a, b) => a.length - b.length);

  return (
    <View className="mt-3 overflow-hidden rounded-[16px] border" style={{ borderColor: neutralColors.border }}>
      <View className="flex-row" style={{ backgroundColor: neutralColors.surface }}>
        {COLUMNS.map((column) => (
          <Text
            key={column}
            className="flex-1 px-2 py-2.5 text-[11px] font-poppins-bold text-text-primary"
          >
            {column}
          </Text>
        ))}
      </View>

      {sortedRuns.map((run, index) => (
        <View
          key={run.length}
          className="flex-row border-t"
          style={{ borderColor: neutralColors.border }}
        >
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {index + 1}
          </Text>
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {run.length.toFixed(2)}
          </Text>
          <Text
            className="flex-1 px-2 py-2.5 text-[12px] font-poppins-semibold"
            style={{ color: primaryColors.purple }}
          >
            {run.period.toFixed(2)}
          </Text>
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {run.frequency.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}
