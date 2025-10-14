import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface LoadingStateProps {
	message?: string;
	size?: "small" | "large";
	color?: string;
}

export default function LoadingState({
	message = "Chargement...",
	size = "large",
	color,
}: LoadingStateProps) {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={color} />
			<Text style={styles.text}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	text: {
		fontStyle: "italic",
		textAlign: "center",
	},
});