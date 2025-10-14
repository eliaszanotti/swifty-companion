import { User } from "@/types/api";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface UserInfoCardProps {
	profile: User;
}

export default function UserInfoCard({ profile }: UserInfoCardProps) {
	const campus = profile.campus.map((c) => c.name).join(", ");

	return (
		<Card mode="elevated">
			<Card.Title title="Information" />
			<Card.Content>
				<Text style={styles.infoText}>Campus: {campus || ""}</Text>
				<Text style={styles.infoText}>
					Pool year: {profile.pool_year || "Not defined"}
				</Text>
				<Text style={styles.infoText}>
					Pool month: {profile.pool_month || ""}
				</Text>
				<Text style={styles.infoText}>
					Location: {profile.location || "Offline"}
				</Text>
				{profile.wallet !== null && profile.wallet !== undefined && (
					<Text style={styles.infoText}>
						Wallet : {profile.wallet} ₿
					</Text>
				)}
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	infoText: {
		marginTop: 8,
	},
});
