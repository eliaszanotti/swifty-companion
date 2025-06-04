import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

interface UserInfoProps {
	login?: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	location?: string;
}

export default function UserInfo({
	login,
	firstName,
	lastName,
	displayName,
	location,
}: UserInfoProps) {
	const theme = useTheme();

	const getDisplayName = () => {
		if (displayName) return displayName;
		if (firstName && lastName) {
			return `${firstName} ${lastName}`;
		}
		return login || "Utilisateur inconnu";
	};

	return (
		<View style={styles.container}>
			<Text
				variant="titleMedium"
				style={{
					color: theme.colors.onSurface,
					fontWeight: "bold",
				}}
			>
				{getDisplayName()}
			</Text>

			{login && (
				<Text variant="bodyMedium" style={{ opacity: 0.7 }}>
					@{login}
				</Text>
			)}

			{location ? (
				<Chip
					mode="flat"
					style={styles.locationChip}
					textStyle={styles.locationText}
				>
					{location}
				</Chip>
			) : (
				<Chip
					mode="flat"
					style={styles.locationChip}
					textStyle={styles.locationText}
				>
					unavailable
				</Chip>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
	},
	locationChip: {
		alignSelf: "flex-start",
	},
	locationText: {
		fontSize: 12,
	},
});
