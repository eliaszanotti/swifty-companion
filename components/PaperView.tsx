import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

export default function PaperView(props: ViewProps) {
	const theme = useTheme();
	return (
		<View
			style={[
				{
					backgroundColor: theme.colors.background,
					flex: 1,
				},
				props.style,
			]}
		>
			{props.children}
		</View>
	);
}
