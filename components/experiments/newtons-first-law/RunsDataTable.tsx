import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import type { NewtonsLawRun } from "@/store/useNewtonsLawExperimentStore";

type RunsDataTableProps = {
  runs: NewtonsLawRun[];
};

const COLUMNS = ["No.", "v₀ (m/s)", "Surface", "Distance (m)", "Time to Stop (s)"];

export function RunsDataTable({ runs }: RunsDataTableProps) {
  if (runs.length === 0) {
    return (
      <View className="mt-3 items-center rounded-[20px] border border-dashed p-6" style={{ borderColor: neutralColors.border }}>
        <Text className="text-center text-[12px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          No runs recorded yet. Play the experiment with different velocities and surfaces to build your data table.
        </Text>
      </View>
    );
  }

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

      {runs.map((run, index) => (
        <View
          key={`${run.initialVelocity}-${run.friction}-${run.frictionless}`}
          className="flex-row border-t"
          style={{ borderColor: neutralColors.border }}
        >
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {index + 1}
          </Text>
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {run.initialVelocity.toFixed(1)}
          </Text>
          <Text
            className="flex-1 px-2 py-2.5 text-[12px] font-poppins-semibold"
            style={{ color: primaryColors.purple }}
          >
            {run.frictionless ? "Frictionless" : run.friction.toFixed(2)}
          </Text>
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {run.distanceTraveled.toFixed(2)}
          </Text>
          <Text className="flex-1 px-2 py-2.5 text-[12px] font-poppins-medium text-text-secondary">
            {run.timeToStop !== null ? run.timeToStop.toFixed(2) : "—"}
          </Text>
        </View>
      ))}
    </View>
  );
}
