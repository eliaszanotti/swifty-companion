import { User } from "@/types/api";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface UserProjectsCardProps {
	profile: User;
}

export default function UserProjectsCard({ profile }: UserProjectsCardProps) {
	const theme = useTheme();
	const displayProjects = profile.projects_users || [];

	return (
		<Card mode="elevated">
			<Card.Content>
				<Text variant="titleMedium" style={styles.infoTitle}>
					Projects
				</Text>
				<View style={styles.projectsContainer}>
					{displayProjects.map((project, index) => {
						if (!project || typeof project !== 'object') {
							return null;
						}

						const projectName = project?.project?.name;
						const projectStatus = project?.status;
						const finalMark = project?.final_mark;

						const safeProjectName = typeof projectName === 'string' && projectName.trim()
							? projectName.trim()
							: "No name";

						const safeProjectStatus = typeof projectStatus === 'string' && projectStatus.trim()
							? projectStatus.trim()
							: "No status";

						return (
							<View
								key={project.id || index}
								style={[
									{
										padding: 8,
										borderRadius: 8,
										backgroundColor:
											theme.colors.secondaryContainer,
										flexDirection: "column",
										gap: 4,
									},
								]}
							>
								<Text
									style={{
										color: theme.colors.onSecondaryContainer,
										fontWeight: "bold",
									}}
								>
									{safeProjectName}
								</Text>
								<Text variant="labelSmall">
									{safeProjectStatus}
								</Text>
								{typeof finalMark === 'number' && finalMark !== null && (
									<Text variant="labelSmall">
										Grade: {finalMark}/100
									</Text>
								)}
							</View>
						);
					})}
				</View>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	infoTitle: {
		marginBottom: 12,
	},
	projectsContainer: {
		gap: 12,
	},
});
