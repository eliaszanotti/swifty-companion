import PaperView from "@/components/PaperView";
import CustomProgressBar from "@/components/ui/CustomProgressBar";
import React, { useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text, useTheme } from "react-native-paper";

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

interface ProjectDetailProps {
	projectsUsers?: ProjectUser[];
	onBack: () => void;
}

export default function ProjectDetail({
	projectsUsers,
	onBack,
}: ProjectDetailProps) {
	const theme = useTheme();

	useEffect(() => {
		const backAction = () => {
			onBack();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, [onBack]);

	const getAllProjects = (): ProjectUser[] => {
		if (!projectsUsers) return [];

		return projectsUsers.sort(
			(a, b) => (b.final_mark || 0) - (a.final_mark || 0)
		);
	};

	const projects = getAllProjects();

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

	return (
		<PaperView style={{ flex: 1, paddingHorizontal: 0 }}>
			<IconButton
				icon="arrow-left"
				mode="contained"
				onPress={onBack}
				style={styles.backButton}
			/>

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
							Projects ({projects.length})
						</Text>

						<View style={styles.projectsContainer}>
							{projects.map((projectUser) => (
								<View
									key={projectUser.id}
									style={styles.projectItem}
								>
									<View style={styles.projectHeader}>
										<Text
											style={[
												styles.projectName,
												{
													color: theme.colors
														.onSurface,
												},
											]}
										>
											{projectUser.project.name}
										</Text>
										<View style={styles.projectMeta}>
											<Text
												style={[
													styles.projectMark,
													{
														color: theme.colors
															.primary,
													},
												]}
											>
												{projectUser.final_mark || 0}
												/100
											</Text>
											<Chip
												style={[
													{
														backgroundColor:
															getStatusColor(
																projectUser
															),
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
									<CustomProgressBar
										progress={getProgressValue(
											projectUser.final_mark
										)}
										color={getStatusColor(projectUser)}
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
	backButton: {
		alignSelf: "flex-start",
		margin: 16,
	},
	card: {
		marginVertical: 8,
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
		fontSize: 16,
		fontWeight: "500",
		flex: 1,
		marginRight: 16,
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
});
