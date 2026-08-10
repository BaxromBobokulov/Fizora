import { Tabs } from "expo-router";

import { TabBar } from "@/components/navigation/TabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="labs" options={{ title: "Labs" }} />
      <Tabs.Screen name="chat" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
