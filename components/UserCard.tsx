import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import Avatar from "./user/Avatar";
import LevelProgressBar from "./user/LevelProgressBar";
import UserInfo from "./user/UserInfo";
import UserStats from "./user/UserStats";

interface User {
	id?: number;
	login?: string;
	first_name?: string;
	last_name?: string;
	displayname?: string;
	email?: string;
	phone?: string;
	wallet?: number;
	correction_point?: number;
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
	location?: string;
}

interface UserCardProps {
	user: User;
}

export default function UserCard({ user }: UserCardProps) {
	const theme = useTheme();

	const getAvatarImageUrl = () => {
		if (user.image?.link) return user.image.link;
		if (user.image?.versions?.medium) return user.image.versions.medium;
		if (user.image?.versions?.small) return user.image.versions.small;
		return undefined;
	};

	const getCurrentLevel = () => {
		if (!user.cursus_users || user.cursus_users.length === 0) return null;

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
						<Avatar
							size={92}
							imageUrl={getAvatarImageUrl()}
							login={user.login}
						/>
					</View>

					<View style={styles.nameSection}>
						<UserInfo
							login={user.login}
							firstName={user.first_name}
							lastName={user.last_name}
							displayName={user.displayname}
							location={user.location}
						/>
					</View>
				</View>

				{currentLevel && (
					<LevelProgressBar currentLevel={currentLevel} />
				)}

				<UserStats
					wallet={user.wallet}
					rank={user.id}
					score={Math.floor(currentLevel?.level || 0)}
					evaluationPoints={user.correction_point}
				/>

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
		marginVertical: 8,
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
	nameSection: {
		flex: 1,
		gap: 8,
		height: "100%",
	},
	infoSection: {
		gap: 8,
	},
	infoRow: {
		flexDirection: "row",
	},
});
