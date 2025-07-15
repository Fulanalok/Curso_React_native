import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    name: {
        fontSize: 16,
        color: colors.gray[400],
        fontWeight: "bold"
    }
});