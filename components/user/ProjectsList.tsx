import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface Project {
	project?: {
		name: string;
		cursus_ids?: number[];
	};
	validated: boolean;
}

interface ProjectsListProps {
	title: string;
	projects: Project[];
	maxItems?: number;
	mode?: "elevated" | "outlined";
}

export default function ProjectsList({
	title,
	projects,
	maxItems = 6,
	mode = "elevated",
}: ProjectsListProps) {
	if (!projects || projects.length === 0) {
		return null;
	}

	const displayProjects = projects
		.filter((project) => project.project?.cursus_ids?.length > 0)
		.slice(0, maxItems);

	if (displayProjects.length === 0) {
		return null;
	}

	return (
		<Card mode={mode} style={styles.infoCard}>
			<Card.Content>
				<Text variant="titleMedium" style={styles.infoTitle}>
					{title}
				</Text>
				<View style={styles.projectsContainer}>
					{displayProjects.map((project, index) => (
						<View key={index} style={styles.projectItem}>
							<Text variant="bodySmall">
								{project.project?.name}
							</Text>
							{project.validated ? (
								<Text style={styles.validated}>✓ Validé</Text>
							) : (
								<Text style={styles.notValidated}>✗ Non validé</Text>
							)}
						</View>
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
	projectsContainer: {
		gap: 8,
	},
	projectItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
	},
	validated: {
		color: "#4CAF50",
		fontWeight: "bold",
	},
	notValidated: {
		color: "#F44336",
		fontWeight: "bold",
	},
});