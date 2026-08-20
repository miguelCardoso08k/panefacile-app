import type { PropsWithChildren } from "react";
import { useSegments } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AppScreen({ children }: PropsWithChildren) {
  const segments = useSegments();
  const isInsideTabs = segments[0] === "(tabs)";

  return (
    <SafeAreaView
      className="flex-1 bg-cream"
      edges={isInsideTabs ? ["top"] : ["top", "bottom"]}
    >
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
