import PaperView from "@/components/PaperView";
import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function AuthErrorPage() {
	const { login } = useAuth();

	const handleRetry = async () => {
		await login();
	};

	const handleGoBack = () => {
		router.back();
	};

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Authentication Error" />
			</Appbar.Header>

			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium" style={styles.errorTitle}>
							Authentication Failed
						</Text>
						<Text variant="bodyLarge" style={styles.errorMessage}>
							We couldn't authenticate you with 42. This could be due to:
						</Text>
						<View style={styles.reasonList}>
							<Text variant="bodyMedium">• Network connection issues</Text>
							<Text variant="bodyMedium">• Invalid credentials</Text>
							<Text variant="bodyMedium">• Server temporarily unavailable</Text>
						</View>

						<View style={styles.buttonContainer}>
							<Button
								mode="contained"
								onPress={handleRetry}
								icon="refresh"
								style={styles.retryButton}
								contentStyle={styles.buttonContent}
							>
								Try Again
							</Button>

							<Button
								mode="outlined"
								onPress={handleGoBack}
								icon="arrow-left"
								style={styles.backButton}
								contentStyle={styles.buttonContent}
							>
								Go Back
							</Button>
						</View>
					</Card.Content>
				</Card>
			</View>
		</PaperView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	card: {
		padding: 24,
	},
	cardContent: {
		alignItems: "center",
		gap: 16,
	},
	errorTitle: {
		color: "#d32f2f",
		textAlign: "center",
	},
	errorMessage: {
		textAlign: "center",
	},
	reasonList: {
		alignSelf: "flex-start",
		gap: 4,
		marginVertical: 8,
	},
	buttonContainer: {
		width: "100%",
		gap: 12,
		marginTop: 8,
	},
	retryButton: {
		width: "100%",
	},
	backButton: {
		width: "100%",
	},
	buttonContent: {
		paddingVertical: 8,
	},
});