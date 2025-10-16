import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface EmptyStateProps {
	title?: string;
	message: string;
}

export default function EmptyState({
	title = "No results",
	message,
}: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<Text variant="headlineMedium">{title}</Text>
			<Text>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		gap: 8,
	},
});
