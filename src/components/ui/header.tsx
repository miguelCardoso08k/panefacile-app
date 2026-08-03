import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

export function Header({ title, back = false, action }: { title: string; back?: boolean; action?: ReactNode }) {
  return (
    <View className="h-16 flex-row items-center border-b border-neutral-200 bg-white px-5">
      <View className="w-10">
        {back ? (
          <Pressable className="h-10 w-10 items-center justify-center" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={23} color="#17201B" />
          </Pressable>
        ) : null}
      </View>
      <Text className="flex-1 text-center text-lg font-bold text-ink">{title}</Text>
      <View className="w-10 items-end">{action}</View>
    </View>
  );
}
