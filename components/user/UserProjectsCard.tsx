import { User } from "@/types/api";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface UserProjectsCardProps {
	profile: User;
}

export default function UserProjectsCard({ profile }: UserProjectsCardProps) {
	const theme = useTheme();
	const displayProjects = profile.projects_users;
	console.log(JSON.stringify(displayProjects[0], null, 2));

	return (
		<Card mode="elevated">
			<Card.Content>
				<Text variant="titleMedium" style={styles.infoTitle}>
					Projets
				</Text>
				<View style={styles.projectsContainer}>
					{displayProjects.map((project, index) => (
						<View
							key={index}
							style={[
								{
									padding: 8,
									borderRadius: 8,
									backgroundColor:
										theme.colors.secondaryContainer,
								},
							]}
						>
							<Text
								variant="bodyMedium"
								style={{
									color: theme.colors.onSecondaryContainer,
								}}
							>
								{project.project?.name}
							</Text>
							<Text>{project.status}</Text>
							{project.final_mark && (
								<Text variant="bodySmall">
									Note: {project.final_mark}/100
								</Text>
							)}
						</View>
					))}
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
