import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface InfoItem {
	label: string;
	value: string;
}

interface InfoCardProps {
	title: string;
	items: InfoItem[];
	mode?: "elevated" | "outlined";
}

export default function InfoCard({ title, items, mode = "elevated" }: InfoCardProps) {
	if (items.length === 0) {
		return null;
	}

	return (
		<Card mode={mode} style={styles.infoCard}>
			<Card.Content>
				<Text variant="titleMedium" style={styles.infoTitle}>
					{title}
				</Text>
				{items.map((item, index) => (
					<View key={index} style={styles.infoItem}>
						<Text variant="bodySmall">{item.label}:</Text>
						<Text>{item.value}</Text>
					</View>
				))}
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
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
});