import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import ProjectsCard from "@/components/ProjectsCard";
import SkillCard from "@/components/SkillCard";
import UserCard from "@/components/UserCard";
import { useProfileApi } from "@/hooks/useProfileApi";
import React, { useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, Text } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

interface UserDetailProps {
	userId: string;
	onBack: () => void;
}

export default function UserDetail({ userId, onBack }: UserDetailProps) {
	const theme = useTheme();
	const { userInfo, loading, error } = useProfileApi(userId);

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

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<PaperSafeAreaView style={styles.container}>
				<IconButton
					icon="arrow-left"
					mode="contained"
					onPress={onBack}
					style={styles.backButton}
				/>

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
	backButton: {
		alignSelf: "flex-start",
		marginBottom: 16,
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
