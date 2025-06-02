import React from "react";
import { StyleSheet } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";

interface CustomProgressBarProps {
	progress: number;
	color?: string;
	height?: number;
	borderRadius?: number;
}

export default function CustomProgressBar({
	progress,
	color,
	height = 12,
	borderRadius = 6,
}: CustomProgressBarProps) {
	const theme = useTheme();

	return (
		<ProgressBar
			progress={progress}
			color={color || theme.colors.primary}
			style={[
				styles.progressBar,
				{
					height,
					borderRadius,
				},
			]}
		/>
	);
}

const styles = StyleSheet.create({
	progressBar: {
		backgroundColor: "rgba(0, 0, 0, 0.1)",
	},
});
