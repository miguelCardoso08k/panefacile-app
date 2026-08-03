import type { PropsWithChildren } from "react";
import { ScrollView } from "react-native";

export function PageScroll({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName={`px-5 pb-8 ${className}`}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
