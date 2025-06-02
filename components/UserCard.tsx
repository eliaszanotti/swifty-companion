import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, ProgressBar, Text, useTheme } from "react-native-paper";

interface User {
	id?: number;
	login?: string;
	first_name?: string;
	last_name?: string;
	displayname?: string;
	email?: string;
	phone?: string;
	image?: {
		link?: string;
		versions?: {
			large?: string;
			medium?: string;
			small?: string;
		};
	};
	cursus_users?: {
		cursus_id: number;
		level: number;
		grade?: string;
		cursus: {
			id: number;
			name: string;
		};
	}[];
}

interface UserCardProps {
	user: User;
}

export default function UserCard({ user }: UserCardProps) {
	const theme = useTheme();

	const getDisplayName = () => {
		if (user.displayname) return user.displayname;
		if (user.first_name && user.last_name) {
			return `${user.first_name} ${user.last_name}`;
		}
		return user.login || "Utilisateur inconnu";
	};

	const getAvatarSource = () => {
		if (user.image?.link) return user.image.link;
		if (user.image?.versions?.medium) return user.image.versions.medium;
		if (user.image?.versions?.small) return user.image.versions.small;
		return undefined;
	};

	const getCurrentLevel = () => {
		if (!user.cursus_users || user.cursus_users.length === 0) return null;

		// Priorité au cursus 42 (cursus_id: 21) ou le premier cursus disponible
		const mainCursus =
			user.cursus_users.find((c) => c.cursus_id === 21) ||
			user.cursus_users[0];
		return mainCursus;
	};

	const currentLevel = getCurrentLevel();

	return (
		<Card style={styles.card} mode="elevated">
			<Card.Content style={styles.cardContent}>
				<View style={styles.header}>
					<View style={styles.avatarContainer}>
						{getAvatarSource() ? (
							<Avatar.Image
								size={92}
								source={{ uri: getAvatarSource() }}
								style={styles.avatar}
							/>
						) : (
							<Avatar.Text
								size={92}
								label={
									user.login
										? user.login
												.substring(0, 2)
												.toUpperCase()
										: "??"
								}
								style={[
									styles.avatar,
									{
										backgroundColor: theme.colors.primary,
									},
								]}
							/>
						)}
					</View>

					<View style={styles.nameSection}>
						<Text
							variant="titleMedium"
							style={[
								styles.displayName,
								{ color: theme.colors.onSurface },
							]}
						>
							{getDisplayName()}
						</Text>
						{user.login && (
							<Text
								variant="bodyMedium"
								style={[{ color: theme.colors.primary }]}
							>
								@{user.login}
							</Text>
						)}

						{currentLevel && (
							<View style={styles.levelSection}>
								<View style={styles.levelHeader}>
									<Text
										style={[
											styles.levelText,
											{ color: theme.colors.onSurface },
										]}
									>
										Level {Math.floor(currentLevel.level)}
									</Text>
									<Text
										style={[
											styles.levelProgress,
											{
												color: theme.colors
													.onSurfaceVariant,
											},
										]}
									>
										{Math.floor(
											(currentLevel.level % 1) * 100
										)}
										%
									</Text>
								</View>
								<ProgressBar
									progress={currentLevel.level % 1}
									color={theme.colors.primary}
									style={styles.progressBar}
								/>
								{currentLevel.grade && (
									<Text
										style={[
											styles.gradeText,
											{
												color: theme.colors
													.onSurfaceVariant,
											},
										]}
									>
										{currentLevel.grade}
									</Text>
								)}
							</View>
						)}
					</View>
				</View>

				<View style={styles.infoSection}>
					{user.email && (
						<View style={styles.infoRow}>
							<Text
								style={[
									{ color: theme.colors.onSurfaceVariant },
								]}
							>
								Email:{" "}
							</Text>
							<Text
								style={[{ color: theme.colors.onSurface }]}
								selectable
							>
								{user.email}
							</Text>
						</View>
					)}

					{user.phone && (
						<View style={styles.infoRow}>
							<Text
								style={[
									{ color: theme.colors.onSurfaceVariant },
								]}
							>
								Phone:{" "}
							</Text>
							<Text
								style={[{ color: theme.colors.onSurface }]}
								selectable
							>
								{user.phone}
							</Text>
						</View>
					)}
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: 8,
	},
	cardContent: {
		gap: 16,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	avatarContainer: {
		height: "100%",
	},
	avatar: {
		borderRadius: 100,
	},
	nameSection: {
		flex: 1,
		gap: 4,
		height: "100%",
	},
	displayName: {
		fontWeight: "bold",
	},
	levelSection: {
		marginTop: 16,
		gap: 8,
	},
	levelHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	levelText: {
		fontSize: 14,
	},
	levelProgress: {
		fontSize: 12,
	},
	progressBar: {
		height: 12,
		borderRadius: 3,
	},
	gradeText: {
		fontSize: 12,
		fontStyle: "italic",
	},
	infoSection: {
		gap: 8,
	},
	infoRow: {
		flexDirection: "row",
	},
});
