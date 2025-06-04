import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

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
	onPress: () => void;
}

export default function ProjectsCard({
	projectsUsers,
	onPress,
}: ProjectsCardProps) {
	const theme = useTheme();

	const hasProjects = () => {
		return projectsUsers && projectsUsers.length > 0;
	};

	if (!hasProjects()) {
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
					Projects
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
