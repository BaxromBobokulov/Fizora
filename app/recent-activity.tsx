import { PlaceholderScreen } from "@/components/navigation/PlaceholderScreen";

// TODO: no real activity feed yet — wire up once we track a chronological event log.
export default function RecentActivity() {
  return (
    <PlaceholderScreen
      showBackButton
      icon="time-outline"
      title="Recent Activity"
      subtitle="A feed of your recent labs and achievements will show up here soon."
    />
  );
}
