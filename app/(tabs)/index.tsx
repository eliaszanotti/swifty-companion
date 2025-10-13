import PaperView from "@/components/PaperView";
import { useSearchApi } from "@/hooks/useSearchApi";
import { SearchProvider, useSearchStore } from "@/hooks/useSearchContext";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Text, TextInput, Card, ActivityIndicator } from "react-native-paper";

function SearchContent() {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const { users, isLoading, error } = useSearchApi();

	const handleUserPress = (login: string) => {
		router.push(`/user/${login}`);
	};

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Swifty Companion" />
			</Appbar.Header>

			<View style={styles.content}>
				{/* Barre de recherche */}
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
					</Card.Content>
				</Card>

				{/* Liste des résultats */}
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
								onPress={() => handleUserPress(user.login)}
							>
								<Card.Content style={styles.userCardContent}>
									<View style={styles.userHeader}>
										{user.image?.link ? (
											<Image
												source={{ uri: user.image.link }}
												style={styles.userAvatar}
											/>
										) : (
											<View style={[styles.userAvatar, styles.avatarPlaceholder]}>
												<Text variant="titleMedium">
													{user.login.charAt(0).toUpperCase()}
												</Text>
											</View>
										)}
										<View style={styles.userInfo}>
											<Text variant="titleSmall">{user.login}</Text>
											{user.displayname && (
												<Text variant="bodyMedium">{user.displayname}</Text>
											)}
										</View>
									</View>
								</Card.Content>
							</Card>
						))}
					</View>
				)}

				{/* Message quand aucun résultat */}
				{!isLoading && !error && searchQuery.trim().length >= 3 && users.length === 0 && (
					<View style={styles.noResultsContainer}>
						<Text variant="bodyMedium" style={styles.noResultsText}>
							Aucun utilisateur trouvé pour &ldquo;{searchQuery}&rdquo;
						</Text>
					</View>
				)}

				{/* Instructions */}
				{!searchQuery.trim() && (
					<View style={styles.instructionsContainer}>
						<Text variant="bodyMedium" style={styles.instructionsText}>
							Entrez au moins 3 caractères pour commencer la recherche
						</Text>
					</View>
				)}
			</View>
		</PaperView>
	);
}

export default function SearchPage() {
	return (
		<SearchProvider>
			<SearchContent />
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
	},
	searchCard: {
		marginBottom: 16,
	},
	searchTitle: {
		marginBottom: 16,
	},
	searchInput: {
		marginBottom: 8,
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
		gap: 8,
	},
	resultsTitle: {
		marginBottom: 8,
	},
	userCard: {
		marginBottom: 8,
	},
	userCardContent: {
		paddingVertical: 4,
	},
	userHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	userAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	avatarPlaceholder: {
		backgroundColor: "#e0e0e0",
		justifyContent: "center",
		alignItems: "center",
	},
	userInfo: {
		flex: 1,
	},
	noResultsContainer: {
		alignItems: "center",
		paddingVertical: 32,
	},
	noResultsText: {
		textAlign: "center",
		opacity: 0.7,
	},
	instructionsContainer: {
		alignItems: "center",
		paddingVertical: 32,
	},
	instructionsText: {
		textAlign: "center",
		opacity: 0.6,
	},
});