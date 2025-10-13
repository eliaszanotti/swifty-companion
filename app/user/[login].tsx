import PaperView from "@/components/PaperView";
import { useProfileApi } from "@/hooks/useProfileApi";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Chip, Text } from "react-native-paper";

export default function UserProfilePage() {
	const { login } = useLocalSearchParams();
	const { userInfo: profile, loading: isLoading, error } = useProfileApi(login as string);

	if (isLoading) {
		return (
			<PaperView style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => router.back()} />
					<Appbar.Content title="Profil" />
				</Appbar.Header>

				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
					<Text style={styles.loadingText}>Chargement du profil...</Text>
				</View>
			</PaperView>
		);
	}

	if (error || !profile) {
		return (
			<PaperView style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => router.back()} />
					<Appbar.Content title="Profil" />
				</Appbar.Header>

				<View style={styles.errorContainer}>
					<Card mode="outlined" style={styles.errorCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.errorTitle}>
								Erreur de chargement
							</Text>
							<Text variant="bodyMedium" style={styles.errorText}>
								{error || "Utilisateur non trouvé"}
							</Text>
							<Button
								mode="outlined"
								onPress={() => router.back()}
								icon="arrow-left"
								style={styles.backButton}
							>
								Retour
							</Button>
						</Card.Content>
					</Card>
				</View>
			</PaperView>
		);
	}

	return (
		<PaperView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title={`Profil: ${profile.login}`} />
			</Appbar.Header>

			<View style={styles.content}>
				{/* Carte profil principale */}
				<Card mode="elevated" style={styles.profileCard}>
					<Card.Content style={styles.profileContent}>
						{profile.image?.link ? (
							<Image
								source={{ uri: profile.image.link }}
								style={styles.avatar}
							/>
						) : (
							<View style={[styles.avatar, styles.avatarPlaceholder]}>
								<Text variant="headlineLarge">
									{profile.login.charAt(0).toUpperCase()}
								</Text>
							</View>
						)}

						<View style={styles.profileInfo}>
							<Text variant="headlineMedium">{profile.login}</Text>
							{profile.displayname && (
								<Text variant="bodyLarge">{profile.displayname}</Text>
							)}
							{profile.email && (
								<Text variant="bodyMedium" style={styles.email}>
									{profile.email}
								</Text>
							)}
						</View>
					</Card.Content>
				</Card>

				{/* Informations générales */}
				{profile.campus && (
					<Card mode="outlined" style={styles.infoCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.infoTitle}>
								Informations
							</Text>
							{profile.campus.length > 0 && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Campus:</Text>
									<Text>{profile.campus[0].name}</Text>
								</View>
							)}
							{profile.pool_year && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Promotion:</Text>
									<Text>{profile.pool_year}</Text>
								</View>
							)}
							{profile.pool_month && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Piscine:</Text>
									<Text>{profile.pool_month}</Text>
								</View>
							)}
							{profile.location && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Location:</Text>
									<Text>{profile.location}</Text>
								</View>
							)}
						</Card.Content>
					</Card>
				)}

				{/* Niveau et wallet */}
				{(profile.cursus_users?.length > 0 || profile.wallet) && (
					<Card mode="outlined" style={styles.infoCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.infoTitle}>
								Progression
							</Text>

							{profile.cursus_users?.length > 0 && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Niveau:</Text>
									<Text>
										{profile.cursus_users[0].grade} -
										{profile.cursus_users[0].level?.toFixed(2)}
									</Text>
								</View>
							)}

							{profile.wallet && (
								<View style={styles.infoItem}>
									<Text variant="bodySmall">Wallet:</Text>
									<Text>{profile.wallet} ₿</Text>
								</View>
							)}
						</Card.Content>
					</Card>
				)}

				{/* Compétences principales */}
				{profile.cursus_users?.[0]?.skills?.length > 0 && (
					<Card mode="outlined" style={styles.infoCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.infoTitle}>
								Compétences principales
							</Text>
							<View style={styles.skillsContainer}>
								{profile.cursus_users[0].skills
									.slice(0, 10)
									.map((skill: any, index: number) => (
										<Chip
											key={index}
											style={styles.skillChip}
											textStyle={styles.skillText}
										>
											{skill.name}: {skill.level.toFixed(1)}
										</Chip>
									))}
							</View>
						</Card.Content>
					</Card>
				)}

				{/* Projets récents */}
				{profile.projects_users?.length > 0 && (
					<Card mode="outlined" style={styles.infoCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.infoTitle}>
								Projets récents
							</Text>
							<View style={styles.projectsContainer}>
								{profile.projects_users
									.slice(0, 5)
									.filter((project: any) => project.project?.cursus_ids?.length > 0)
									.map((project: any, index: number) => (
										<View key={index} style={styles.projectItem}>
											<Text variant="bodySmall">
												{project.project?.name}
											</Text>
											{project.validated ? (
												<Text style={styles.validated}>✓ Validé</Text>
											) : (
												<Text style={styles.notValidated}>✗ Non validé</Text>
											)}
										</View>
									))}
							</View>
						</Card.Content>
					</Card>
				)}

				<Button
					mode="outlined"
					onPress={() => router.back()}
					icon="arrow-left"
					style={styles.backButton}
				>
					Retour à la recherche
				</Button>
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
		padding: 16,
		gap: 16,
	},
	profileCard: {
		padding: 16,
	},
	profileContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	avatarPlaceholder: {
		backgroundColor: "#e0e0e0",
		justifyContent: "center",
		alignItems: "center",
	},
	profileInfo: {
		flex: 1,
	},
	email: {
		opacity: 0.7,
		fontStyle: "italic",
	},
	infoCard: {
		padding: 16,
	},
	infoTitle: {
		marginBottom: 12,
	},
	infoItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	skillsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	skillChip: {
		backgroundColor: "#f0f0f0",
	},
	skillText: {
		fontSize: 12,
	},
	projectsContainer: {
		gap: 8,
	},
	projectItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
	},
	validated: {
		color: "#4CAF50",
		fontWeight: "bold",
	},
	notValidated: {
		color: "#F44336",
		fontWeight: "bold",
	},
	backButton: {
		marginTop: 8,
	},
	// États spéciaux
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
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	errorCard: {
		padding: 24,
	},
	errorTitle: {
		textAlign: "center",
		marginBottom: 8,
	},
	errorText: {
		textAlign: "center",
		marginBottom: 16,
		color: "#B00020",
	},
});