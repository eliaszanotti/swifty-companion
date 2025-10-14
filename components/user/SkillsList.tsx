import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

interface Skill {
	name: string;
	level: number;
}

interface SkillsListProps {
	title: string;
	skills: Skill[];
	maxItems?: number;
	mode?: "elevated" | "outlined";
}

export default function SkillsList({
	title,
	skills,
	maxItems = 8,
	mode = "elevated",
}: SkillsListProps) {
	if (!skills || skills.length === 0) {
		return null;
	}

	const displaySkills = skills.slice(0, maxItems);

	return (
		<Card mode={mode} style={styles.infoCard}>
			<Card.Content>
				<Text variant="titleMedium" style={styles.infoTitle}>
					{title}
				</Text>
				<View style={styles.skillsContainer}>
					{displaySkills.map((skill, index) => (
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
	);
}

const styles = StyleSheet.create({
	infoCard: {
		padding: 16,
	},
	infoTitle: {
		marginBottom: 12,
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
});