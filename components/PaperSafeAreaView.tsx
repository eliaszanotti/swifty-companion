import React from "react";
import { ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaperSafeAreaView(props: ViewProps) {
	const theme = useTheme();
	return (
		<SafeAreaView
			{...props}
			style={[{ backgroundColor: theme.colors.background }, props.style]}
		>
			{props.children}
		</SafeAreaView>
	);
}
