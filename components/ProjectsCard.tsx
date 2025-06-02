import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Button,
	Card,
	Chip,
	ProgressBar,
	Text,
	useTheme,
} from "react-native-paper";

interface ProjectUser {
	id: number;
	final_mark?: number;
	status: string;
	"validated?"?: boolean;
	project: {
		id: number;
		name: string;
		slug: string;
	};
}

interface ProjectsCardProps {
	projectsUsers?: ProjectUser[];
}

export default function ProjectsCard({ projectsUsers }: ProjectsCardProps) {
	const theme = useTheme();
	const [showAll, setShowAll] = useState(false);

	const getCompletedProjects = (): ProjectUser[] => {
		if (!projectsUsers) return [];

		return projectsUsers.sort(
			(a, b) => (b.final_mark || 0) - (a.final_mark || 0)
		);
	};

	const displayedProjects = showAll
		? getCompletedProjects()
		: getCompletedProjects().slice(0, 5);

	const getProgressValue = (mark?: number) => {
		if (!mark) return 0;
		return Math.min(mark / 100, 1);
	};

	const getStatusColor = (project: ProjectUser) => {
		if (project.status === "finished") {
			return "#a1c181";
		}
		return "#ff686b";
	};

	const getStatusText = (project: ProjectUser) => {
		if (project["validated?"]) return "Validated";
		if (project.status === "in_progress") return "In progress";
		if (project.status === "waiting_for_correction")
			return "Waiting for correction";
		if (project.status === "searching_a_group") return "Searching a group";
		if (project.status === "createing_group") return "Creating group";
		return project.status;
	};

	if (!projectsUsers || projectsUsers.length === 0) {
		return null;
	}

	return (
		<Card style={styles.card} mode="elevated">
			<Card.Content style={styles.cardContent}>
				<Text
					variant="titleMedium"
					style={[styles.title, { color: theme.colors.onSurface }]}
				>
					Projets ({getCompletedProjects().length})
				</Text>

				<View style={styles.projectsContainer}>
					{displayedProjects.map((projectUser) => (
						<View key={projectUser.id} style={styles.projectItem}>
							<View style={styles.projectHeader}>
								<Text
									style={[
										styles.projectName,
										{ color: theme.colors.onSurface },
									]}
								>
									{projectUser.project.name}
								</Text>
								<View style={styles.projectMeta}>
									<Text
										style={[
											styles.projectMark,
											{ color: theme.colors.primary },
										]}
									>
										{projectUser.final_mark || 0}/100
									</Text>
									<Chip
										style={[
											{
												backgroundColor:
													getStatusColor(projectUser),
											},
										]}
										textStyle={{
											color: "white",
											fontSize: 10,
										}}
									>
										{getStatusText(projectUser)}
									</Chip>
								</View>
							</View>
							<ProgressBar
								progress={getProgressValue(
									projectUser.final_mark
								)}
								color={getStatusColor(projectUser)}
								style={styles.progressBar}
							/>
						</View>
					))}
				</View>

				{getCompletedProjects().length > 5 && (
					<Button
						mode="text"
						onPress={() => setShowAll(!showAll)}
						style={styles.showMoreButton}
					>
						{showAll
							? "Afficher moins"
							: `Afficher plus (${
									getCompletedProjects().length - 5
							  } restants)`}
					</Button>
				)}
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		margin: 8,
	},
	cardContent: {
		gap: 16,
	},
	title: {
		fontWeight: "bold",
	},
	projectsContainer: {
		gap: 12,
	},
	projectItem: {
		gap: 8,
	},
	projectHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	projectName: {
		fontSize: 14,
		fontWeight: "500",
		flex: 1,
		marginRight: 8,
	},
	projectMeta: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	projectMark: {
		fontSize: 14,
		fontWeight: "bold",
		minWidth: 50,
		textAlign: "right",
	},
	progressBar: {
		height: 12,
		borderRadius: 3,
	},
	showMoreButton: {
		alignSelf: "center",
	},
});
