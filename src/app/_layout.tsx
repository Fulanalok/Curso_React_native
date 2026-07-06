import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

import { colors } from "@/styles/colors";

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
