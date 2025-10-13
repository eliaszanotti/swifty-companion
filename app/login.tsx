import PaperView from "@/components/PaperView";
import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function LoginPage() {
	const { isLoggedIn, login } = useAuth();
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (isLoggedIn) {
			router.replace("/profile");
		}
	}, [isLoggedIn]);

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await login();
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.back();
	};

	if (isLoggedIn) {
		return (
			<PaperView style={styles.container}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
					<Text style={styles.loadingText}>Connexion en cours...</Text>
				</View>
			</PaperView>
		);
	}

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={handleBack} />
				<Appbar.Content title="Connexion" />
			</Appbar.Header>

			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium" style={styles.title}>
							Swifty Companion
						</Text>
						<Text variant="bodyLarge" style={styles.subtitle}>
							Connectez-vous avec votre compte 42 pour accéder à votre profil
						</Text>

						<View style={styles.features}>
							<Text variant="titleSmall" style={styles.featuresTitle}>
								Avec la connexion, vous pouvez :
							</Text>
							<View style={styles.featureItem}>
								<Text>• Voir votre profil complet</Text>
							</View>
							<View style={styles.featureItem}>
								<Text>• Consulter vos compétences et projets</Text>
							</View>
							<View style={styles.featureItem}>
								<Text>• Rechercher d&apos;autres étudiants</Text>
							</View>
						</View>

						<Button
							mode="contained"
							onPress={handleLogin}
							disabled={isLoading}
							icon="login"
							style={styles.loginButton}
							contentStyle={styles.loginButtonContent}
						>
							{isLoading ? "Connexion..." : "Se connecter avec 42"}
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	loadingText: {
		fontStyle: "italic",
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
	title: {
		textAlign: "center",
	},
	subtitle: {
		textAlign: "center",
		lineHeight: 20,
	},
	features: {
		alignSelf: "flex-start",
		width: "100%",
		gap: 8,
	},
	featuresTitle: {
		marginBottom: 8,
	},
	featureItem: {
		paddingLeft: 8,
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
});