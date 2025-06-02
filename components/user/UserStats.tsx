import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface UserStatsProps {
	wallet?: number;
	rank?: number;
	score?: number;
	evaluationPoints?: number;
}

export default function UserStats({
	wallet,
	rank,
	score,
	evaluationPoints,
}: UserStatsProps) {
	const theme = useTheme();

	const stats = [
		{
			icon: "₳",
			value: wallet ?? 0,
			label: "Wallet",
		},
		{
			value: evaluationPoints ?? 0,
			label: "Ev.P",
		},
	];

	return (
		<View style={styles.container}>
			{stats.map((stat, index) => (
				<View key={stat.label} style={styles.statItem}>
					<Text
						style={[
							styles.statValue,
							{ color: theme.colors.primary },
						]}
					>
						{stat.icon}
						{stat.value}
					</Text>
					<Text
						style={[
							styles.statLabel,
							{ color: theme.colors.onSurfaceVariant },
						]}
					>
						{stat.label}
					</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 12,
		paddingHorizontal: 8,
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		borderRadius: 8,
		marginTop: 8,
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statValue: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 2,
	},
	statLabel: {
		fontSize: 11,
		textAlign: "center",
	},
});
