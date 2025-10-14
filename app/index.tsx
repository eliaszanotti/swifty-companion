import PaperView from "@/components/PaperView";
import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function LoginPage() {
	const { login, isLoggedIn, isLoading } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			router.replace("/(tabs)");
		}
	}, [isLoggedIn]);

	const handleLogin = async () => {
		await login();
	};

	if (isLoggedIn) {
		return (
			<PaperView style={styles.container}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
					<Text style={styles.loadingText}>Redirection...</Text>
				</View>
			</PaperView>
		);
	}

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Connexion" />
			</Appbar.Header>

			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium">Swifty Companion</Text>
						<Text variant="bodyLarge">
							Connectez-vous avec votre compte 42 pour accéder à
							votre profil
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
								? "Connexion..."
								: "Se connecter avec 42"}
						</Button>

						<Text variant="bodySmall" style={styles.securityNote}>
							Vos identifiants sont sécurisés avec OAuth2
						</Text>
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
});
