import PaperView from "@/components/PaperView";
import CustomProgressBar from "@/components/ui/CustomProgressBar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface Skill {
	id: number;
	name: string;
	level: number;
}

interface CursusUser {
	skills?: Skill[];
}

interface SkillDetailProps {
	cursusUsers?: CursusUser[];
}

export default function SkillDetail({ cursusUsers }: SkillDetailProps) {
	const theme = useTheme();

	const extractSkills = (): Skill[] => {
		if (!cursusUsers) return [];

		const allSkills: Skill[] = [];
		cursusUsers.forEach((cursusUser) => {
			if (cursusUser.skills) {
				cursusUser.skills.forEach((skill) => {
					const existingSkill = allSkills.find(
						(s) => s.id === skill.id
					);
					if (!existingSkill || skill.level > existingSkill.level) {
						if (existingSkill) {
							Object.assign(existingSkill, skill);
						} else {
							allSkills.push(skill);
						}
					}
				});
			}
		});

		return allSkills.sort((a, b) => b.level - a.level);
	};

	const skills = extractSkills();

	const formatSkillLevel = (level: number) => {
		return `${Math.floor(level * 100) / 100}%`;
	};

	const getProgressValue = (level: number) => {
		return Math.min(level / 20, 1);
	};

	return (
		<PaperView>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				<Card style={styles.card} mode="elevated">
					<Card.Content style={styles.cardContent}>
						<Text
							variant="titleMedium"
							style={[
								styles.title,
								{ color: theme.colors.onSurface },
							]}
						>
							Skills
						</Text>

						<View style={styles.skillsContainer}>
							{skills.map((skill) => (
								<View key={skill.id} style={styles.skillItem}>
									<View style={styles.skillHeader}>
										<Text
											style={[
												styles.skillName,
												{
													color: theme.colors
														.onSurface,
												},
											]}
										>
											{skill.name}
										</Text>
										<Text
											style={[
												styles.skillLevel,
												{ color: theme.colors.primary },
											]}
										>
											{formatSkillLevel(skill.level)}
										</Text>
									</View>
									<CustomProgressBar
										progress={getProgressValue(skill.level)}
										color={theme.colors.primary}
									/>
								</View>
							))}
						</View>
					</Card.Content>
				</Card>
			</ScrollView>
		</PaperView>
	);
}

const styles = StyleSheet.create({
	card: {
		marginVertical: 8,
	},
	cardContent: {
		gap: 16,
	},
	title: {
		fontWeight: "bold",
	},
	skillsContainer: {
		gap: 16,
	},
	skillItem: {
		gap: 8,
	},
	skillHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	skillName: {
		fontSize: 14,
		fontWeight: "500",
		flex: 1,
	},
	skillLevel: {
		fontSize: 14,
		fontWeight: "bold",
		minWidth: 50,
		textAlign: "right",
	},
});
