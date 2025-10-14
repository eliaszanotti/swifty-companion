import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
	retryText?: string;
	onDismiss?: () => void;
	dismissText?: string;
}

export default function ErrorState({
	title = "Erreur",
	message,
	onRetry,
	retryText = "Réessayer",
	onDismiss,
	dismissText = "Retour",
}: ErrorStateProps) {
	return (
		<View style={styles.container}>
			<Card mode="outlined" style={styles.errorCard}>
				<Card.Content style={styles.cardContent}>
					<Text variant="titleMedium" style={styles.errorTitle}>
						{title}
					</Text>
					<Text variant="bodyMedium" style={styles.errorText}>
						{message || "Une erreur est survenue"}
					</Text>

					<View style={styles.actionsContainer}>
						{onRetry && (
							<Button
								mode="contained"
								onPress={onRetry}
								style={styles.actionButton}
							>
								{retryText}
							</Button>
						)}
						{onDismiss && (
							<Button
								mode="outlined"
								onPress={onDismiss}
								style={styles.actionButton}
							>
								{dismissText}
							</Button>
						)}
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
		padding: 24,
	},
	cardContent: {
		alignItems: "center",
		gap: 16,
	},
	errorTitle: {
		textAlign: "center",
	},
	errorText: {
		textAlign: "center",
		color: "#B00020",
	},
	actionsContainer: {
		gap: 8,
		width: "100%",
	},
	actionButton: {
		width: "100%",
	},
});