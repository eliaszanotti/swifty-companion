import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface EmptyStateProps {
	title?: string;
	message?: string;
	icon?: string;
}

export default function EmptyState({
	title = "Aucun résultat",
	message,
	icon,
}: EmptyStateProps) {
	return (
		<View style={styles.container}>
			{icon && (
				<Text variant="displayLarge" style={styles.icon}>
					{icon}
				</Text>
			)}
			<Text variant="titleMedium" style={styles.title}>
				{title}
			</Text>
			{message && (
				<Text variant="bodyMedium" style={styles.message}>
					{message}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 32,
		paddingHorizontal: 16,
	},
	icon: {
		marginBottom: 16,
		opacity: 0.5,
	},
	title: {
		textAlign: "center",
		marginBottom: 8,
		opacity: 0.7,
	},
	message: {
		textAlign: "center",
		opacity: 0.6,
	},
});