import { User } from "@/types/api";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import UserAvatar from "./UserAvatar";

interface ProfileCardProps {
	profile: User;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
	return (
		<Card mode="elevated">
			<Card.Content style={styles.profileContent}>
				<UserAvatar
					imageUrl={profile.image?.link}
					login={profile.login}
					size="large"
				/>
				<View style={styles.profileInfo}>
					<Text>{profile.login}</Text>
					<Text variant="bodyLarge">
						{profile.displayname || "Pas de nom"}
					</Text>
					<Text style={styles.email}>
						{profile.email || "Pas d'email"}
					</Text>
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	profileContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	profileInfo: {
		flex: 1,
	},
	email: {
		opacity: 0.7,
		fontStyle: "italic",
	},
});
