import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../global.css";
import { MockDataProvider } from "@/src/data/mock-store";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <MockDataProvider>
        <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
      </MockDataProvider>
    </>
  );
}
