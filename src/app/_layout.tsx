import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/styles/colors";
import { SafeAreaView } from "react-native";

export default function Layout() {
  const backgroundColor = colors.gray[950];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.gray[950],
          },
        }}
      />
    </SafeAreaView>
  );
}
