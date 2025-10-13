import PaperView from "@/components/PaperView";
import { useSearchApi } from "@/hooks/useSearchApi";
import { SearchProvider, useSearchStore } from "@/hooks/useSearchContext";
import { useAuth } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text, TextInput } from "react-native-paper";

function HomeContent() {
	const { isLoggedIn } = useAuth();
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { users, isLoading, error } = useSearchApi();

	const handleProfilePress = () => {
		if (isLoggedIn) {
			router.push("/profile");
		} else {
			router.push("/login");
		}
	};

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Swifty Companion" />
				<Appbar.Action icon="account" onPress={handleProfilePress} />
			</Appbar.Header>

			<View style={styles.content}>
				<Card mode="elevated" style={styles.welcomeCard}>
					<Card.Content>
						<Text variant="headlineMedium" style={styles.title}>
							Bienvenue !
						</Text>
						<Text variant="bodyLarge" style={styles.subtitle}>
							Recherchez des étudiants 42 et consultez leurs profils
						</Text>
					</Card.Content>
				</Card>

				<Card mode="elevated" style={styles.searchCard}>
					<Card.Content>
						<Text variant="titleMedium" style={styles.searchTitle}>
							Rechercher un étudiant
						</Text>
						<TextInput
							mode="outlined"
							placeholder="Entrez un login 42..."
							value={searchQuery}
							onChangeText={setSearchQuery}
							right={<TextInput.Icon icon="magnify" />}
							style={styles.searchInput}
						/>

						{isLoading && (
							<View style={styles.loadingContainer}>
								<ActivityIndicator size="small" />
								<Text style={styles.loadingText}>Recherche en cours...</Text>
							</View>
						)}

						{error && (
							<Text style={styles.errorText}>{error}</Text>
						)}

						{users.length > 0 && (
							<View style={styles.resultsContainer}>
								<Text variant="titleMedium" style={styles.resultsTitle}>
									Résultats ({users.length})
								</Text>
								{users.map((user: any) => (
									<Card
										key={user.id}
										mode="outlined"
										style={styles.userCard}
										onPress={() => {
											// TODO: Naviguer vers le profil de l'utilisateur
											console.log("Voir profil:", user.login);
										}}
									>
										<Card.Content style={styles.userCardContent}>
											<Text variant="titleSmall">{user.login}</Text>
											{user.displayname && (
												<Text variant="bodyMedium">{user.displayname}</Text>
											)}
										</Card.Content>
									</Card>
								))}
							</View>
						)}
					</Card.Content>
				</Card>

				{!isLoggedIn && (
					<Card mode="elevated" style={styles.loginCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.loginTitle}>
								Connectez-vous
							</Text>
							<Text variant="bodyMedium" style={styles.loginSubtitle}>
								Pour accéder à votre profil et voir plus de détails
							</Text>
							<Button
								mode="contained"
								onPress={() => router.push("/login")}
								icon="login"
								style={styles.loginButton}
							>
								Se connecter
							</Button>
						</Card.Content>
					</Card>
				)}
			</View>
		</PaperView>
	);
}

export default function IndexPage() {
	return (
		<SearchProvider>
			<HomeContent />
		</SearchProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
		gap: 16,
	},
	welcomeCard: {
		padding: 16,
	},
	title: {
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		textAlign: "center",
	},
	searchCard: {
		padding: 16,
	},
	searchTitle: {
		marginBottom: 16,
	},
	searchInput: {
		marginBottom: 16,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 8,
	},
	loadingText: {
		fontStyle: "italic",
	},
	errorText: {
		color: "#B00020",
		marginVertical: 8,
	},
	resultsContainer: {
		marginTop: 16,
		gap: 8,
	},
	resultsTitle: {
		marginBottom: 8,
	},
	userCard: {
		marginBottom: 8,
	},
	userCardContent: {
		paddingVertical: 8,
	},
	loginCard: {
		padding: 16,
	},
	loginTitle: {
		marginBottom: 8,
	},
	loginSubtitle: {
		marginBottom: 16,
	},
	loginButton: {
		alignSelf: "flex-start",
	},
});