import PaperView from "@/components/PaperView";
import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function LoginPage() {
	const { login, isLoading, authError, clearAuthError } = useAuth();

	useEffect(() => {
		if (authError) {
			clearAuthError();
		}
	}, [authError, clearAuthError]);

	const handleLogin = async () => {
		clearAuthError();
		await login();
	};

	const handleShowError = () => {
		router.push("/(auth)/error");
	};

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Login" />
			</Appbar.Header>

			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium">Swifty Companion</Text>
						<Text variant="bodyLarge">
							Connect with your 42 account to access your profile
						</Text>

						<Button
							mode="contained"
							onPress={handleLogin}
							disabled={isLoading}
							icon="login"
							style={styles.loginButton}
							contentStyle={styles.loginButtonContent}
						>
							{isLoading
								? "Connecting..."
								: "Connect with 42"}
						</Button>

						<Text variant="bodySmall" style={styles.securityNote}>
							Your credentials are secured with OAuth2
						</Text>

						{authError && (
							<View style={styles.errorContainer}>
								<Text style={styles.errorText}>{authError}</Text>
								<Button
									mode="text"
									onPress={handleShowError}
									compact
									style={styles.errorButton}
								>
									Learn More
								</Button>
							</View>
						)}
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
		gap: 24,
	},
	loginButton: {
		width: "100%",
		marginTop: 8,
	},
	loginButtonContent: {
		paddingVertical: 8,
	},
	securityNote: {
		textAlign: "center",
		fontStyle: "italic",
		opacity: 0.7,
		marginTop: 8,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	loadingText: {
		fontStyle: "italic",
	},
	errorContainer: {
		width: "100%",
		padding: 12,
		backgroundColor: "#ffebee",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ffcdd2",
	},
	errorText: {
		color: "#c62828",
		textAlign: "center",
		fontSize: 14,
	},
	errorButton: {
		marginTop: 4,
		alignSelf: "center",
	},
});
