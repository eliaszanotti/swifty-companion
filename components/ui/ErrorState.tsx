import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry: () => void;
}

export default function ErrorState({
	title = "Error",
	message,
	onRetry,
}: ErrorStateProps) {
	return (
		<View style={styles.container}>
			<Card mode="elevated" style={styles.errorCard}>
				<Card.Content style={styles.cardContent}>
					<Text variant="headlineMedium">{title}</Text>
					<Text variant="bodyMedium">
						{message || "An error occurred"}
					</Text>

					<View style={styles.actionsContainer}>
						<Button mode="contained" onPress={onRetry}>
							Retry
						</Button>
					</View>
				</Card.Content>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	errorCard: {
		padding: 16,
	},
	cardContent: {
		gap: 16,
	},
	errorTitle: {
		textAlign: "center",
	},
	actionsContainer: {
		gap: 8,
		width: "100%",
	},
	actionButton: {
		width: "100%",
	},
});
