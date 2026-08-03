import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "./bottom-nav";

export function AppScreen({ children, tab }: PropsWithChildren<{ tab?: string }>) {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-1">{children}</View>
      {tab ? <BottomNav active={tab} /> : null}
    </SafeAreaView>
  );
}
