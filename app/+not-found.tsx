import PaperView from "@/components/PaperView";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function NotFoundScreen() {
	const handleGoBack = () => {
		router.back();
	};

	const handleGoHome = () => {
		router.push("/(auth)");
	};

	return (
		<PaperView style={styles.container}>
			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium">Page Not Found</Text>
						<Text>
							The page you&apos;re looking for doesn&apos;t exist.
						</Text>

						<View style={styles.buttonContainer}>
							<Button
								mode="contained"
								onPress={handleGoHome}
								icon="home"
								style={styles.homeButton}
								contentStyle={styles.buttonContent}
							>
								Go Home
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
		padding: 16,
	},
	cardContent: {
		gap: 16,
	},
	errorTitle: {
		color: "#d32f2f",
		textAlign: "center",
	},
	errorMessage: {
		textAlign: "center",
	},
	buttonContainer: {
		width: "100%",
		gap: 12,
		marginTop: 8,
	},
	homeButton: {
		width: "100%",
	},
	backButton: {
		width: "100%",
	},
	buttonContent: {
		paddingVertical: 8,
	},
});
