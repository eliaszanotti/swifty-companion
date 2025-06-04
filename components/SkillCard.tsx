import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface Skill {
	id: number;
	name: string;
	level: number;
}

interface CursusUser {
	skills?: Skill[];
}

interface SkillCardProps {
	cursusUsers?: CursusUser[];
	onPress: () => void;
}

export default function SkillCard({ cursusUsers, onPress }: SkillCardProps) {
	const theme = useTheme();

	const hasSkills = () => {
		return cursusUsers?.some(
			(cursusUser) => cursusUser.skills && cursusUser.skills.length > 0
		);
	};

	if (!hasSkills()) {
		return null;
	}

	return (
		<Card
			style={{
				marginVertical: 8,
				minHeight: 80,
				justifyContent: "center",
			}}
			mode="elevated"
			onPress={onPress}
		>
			<Card.Content style={styles.cardContent}>
				<Text variant="titleMedium" style={{ fontWeight: "bold" }}>
					Skills
				</Text>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	cardContent: {
		alignItems: "center",
		justifyContent: "center",
	},
});
