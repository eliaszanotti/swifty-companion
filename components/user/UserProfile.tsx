import PaperView from "@/components/PaperView";
import ProjectsCard from "@/components/ProjectsCard";
import SkillCard from "@/components/SkillCard";
import UserCard from "@/components/UserCard";
import { useProfileApi } from "@/hooks/useProfileApi";
import React from "react";
import { ScrollView, Text } from "react-native";
import { useTheme } from "react-native-paper";

interface UserProfileProps {
	userId?: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
	const theme = useTheme();
	const { userInfo, loading, error } = useProfileApi(userId);

	return (
		<PaperView>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{error && (
					<Text
						style={{
							color: theme.colors.error,
							textAlign: "center",
							fontStyle: "italic",
							marginVertical: 16,
						}}
					>
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
						style={{
							textAlign: "center",
							fontStyle: "italic",
							marginVertical: 16,
							color: theme.colors.onSurface,
						}}
					>
						Loading user info...
					</Text>
				)}
			</ScrollView>
		</PaperView>
	);
}
