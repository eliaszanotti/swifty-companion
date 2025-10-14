import ProfileCard from "@/components/user/ProfileCard";
import UserInfoCard from "@/components/user/UserInfoCard";
import UserProjectsCard from "@/components/user/UserProjectsCard";
import UserSkillsCard from "@/components/user/UserSkillsCard";
import { User } from "@/types/api";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface UserProfileProps {
	profile: User;
}

export default function UserProfile({ profile }: UserProfileProps) {
	return (
		<ScrollView style={styles.content}>
			<View style={styles.contentView}>
				<ProfileCard profile={profile} />
				<UserInfoCard profile={profile} />
				<UserSkillsCard profile={profile} />
				<UserProjectsCard profile={profile} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: "column",
	},
	contentView: {
		flex: 1,
		flexDirection: "column",
		gap: 16,
		padding: 16,
	},
});
