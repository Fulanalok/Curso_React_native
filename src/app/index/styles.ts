import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    },
    title: {
        fontSize: 24,
        color: colors.gray[900],
        fontWeight: "bold",
    },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: colors.green[900],
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 40,
  },
});
