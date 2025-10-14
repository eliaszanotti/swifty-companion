import { User } from "@/types/api";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

interface UserSkillsCardProps {
	profile: User;
}

export default function UserSkillsCard({ profile }: UserSkillsCardProps) {
	return (
		<>
			{profile.cursus_users.map((cursus, cursusIndex) => {
				const skills = cursus.skills || [];
				return (
					<Card
						key={cursusIndex}
						mode="elevated"
						style={styles.infoCard}
					>
						<Card.Content>
							<Text
								variant="titleMedium"
								style={styles.infoTitle}
							>
								{cursus.cursus.name} - {cursus.level.toFixed(2)}
								%
							</Text>
							<View style={styles.skillsContainer}>
								{skills.map((skill, skillIndex) => (
									<Chip
										compact
										key={skillIndex}
										textStyle={styles.skillText}
									>
										{skill.name}: {skill.level.toFixed(1)}
									</Chip>
								))}
							</View>
						</Card.Content>
					</Card>
				);
			})}
		</>
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
	skillText: {
		fontSize: 12,
	},
});
