import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaperSafeAreaView(props: ViewProps) {
	const theme = useTheme();
	return (
		<SafeAreaView
			style={[
				{
					backgroundColor: theme.colors.background,
					flex: 1,
				},
			]}
		>
			<KeyboardAvoidingView
				{...props}
				style={[{ flex: 1, paddingHorizontal: 16 }, props.style]}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				{props.children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
