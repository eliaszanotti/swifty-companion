import PaperView from "@/components/PaperView";
import ProjectsCard from "@/components/ProjectsCard";
import SkillCard from "@/components/SkillCard";
import UserCard from "@/components/UserCard";
import { useProfileApi } from "@/hooks/useProfileApi";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import ProjectDetail from "./ProjectDetail";
import SkillDetail from "./SkillDetail";

interface UserProfileProps {
	userId?: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
	const theme = useTheme();
	const { userInfo, loading, error } = useProfileApi(userId);
	const [showSkillDetail, setShowSkillDetail] = useState(false);
	const [showProjectDetail, setShowProjectDetail] = useState(false);

	const handleShowSkills = () => {
		setShowSkillDetail(true);
	};

	const handleBackFromSkills = () => {
		setShowSkillDetail(false);
	};

	const handleShowProjects = () => {
		setShowProjectDetail(true);
	};

	const handleBackFromProjects = () => {
		setShowProjectDetail(false);
	};

	if (showSkillDetail) {
		return (
			<SkillDetail
				cursusUsers={userInfo?.cursus_users}
				onBack={handleBackFromSkills}
			/>
		);
	}

	if (showProjectDetail) {
		return (
			<ProjectDetail
				projectsUsers={userInfo?.projects_users}
				onBack={handleBackFromProjects}
			/>
		);
	}

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
				<View style={{ gap: 16, flexDirection: "row" }}>
					{userInfo && (
						<View style={{ flex: 1 }}>
							<SkillCard
								cursusUsers={userInfo.cursus_users}
								onPress={handleShowSkills}
							/>
						</View>
					)}
					{userInfo && (
						<View style={{ flex: 1 }}>
							<ProjectsCard
								projectsUsers={userInfo.projects_users}
								onPress={handleShowProjects}
							/>
						</View>
					)}
				</View>

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
