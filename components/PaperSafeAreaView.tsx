import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaperSafeAreaView(props: ViewProps) {
	const theme = useTheme();
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<SafeAreaView
				{...props}
				style={[
					{
						backgroundColor: theme.colors.background,
						flex: 1,
						padding: 16,
					},
					props.style,
				]}
			>
				{props.children}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
