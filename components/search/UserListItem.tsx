import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import UserAvatar from "../user/UserAvatar";

interface User {
	id: number;
	login: string;
	displayname?: string;
	image?: {
		link: string;
	};
}

interface UserListItemProps {
	user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
	const handlePress = () => {
		router.push(`/user/${user.login}`);
	};

	return (
		<Card
			key={user.id}
			mode="elevated"
			style={styles.userCard}
			onPress={handlePress}
		>
			<Card.Content style={styles.userCardContent}>
				<View style={styles.userHeader}>
					<UserAvatar
						imageUrl={user.image?.link}
						login={user.login}
						size="small"
					/>
					<View style={styles.userInfo}>
						<Text variant="titleSmall">{user.login}</Text>
						{user.displayname && (
							<Text variant="bodyMedium">{user.displayname}</Text>
						)}
					</View>
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	userCard: {
		marginBottom: 8,
	},
	userCardContent: {
		padding: 4,
	},
	userHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	userInfo: {
		flex: 1,
	},
});
