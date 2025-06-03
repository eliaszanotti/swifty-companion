import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import ProjectsCard from "@/components/ProjectsCard";
import SkillCard from "@/components/SkillCard";
import UserCard from "@/components/UserCard";
import { useProfileApi } from "@/hooks/useProfileApi";

import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { userInfo, loading, error } = useProfileApi();

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<PaperSafeAreaView style={styles.container}>
				{error && (
					<Text style={[styles.error, { color: theme.colors.error }]}>
						{error}
					</Text>
				)}

				{userInfo && <UserCard user={userInfo} />}
				{userInfo && <SkillCard cursusUsers={userInfo.cursus_users} />}
				{userInfo && (
					<ProjectsCard projectsUsers={userInfo.projects_users} />
				)}

				{loading && (
					<Text
						style={[
							styles.loading,
							{ color: theme.colors.onSurface },
						]}
					>
						Loading user info...
					</Text>
				)}
			</PaperSafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		gap: 16,
	},
	loading: {
		textAlign: "center",
		fontStyle: "italic",
		marginVertical: 16,
	},
	error: {
		textAlign: "center",
		fontStyle: "italic",
		marginVertical: 16,
	},
});
