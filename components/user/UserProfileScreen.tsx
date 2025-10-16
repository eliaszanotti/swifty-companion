import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import UserProfile from "@/components/user/UserProfile";
import { useProfileApi } from "@/hooks/useProfileApi";
import { User } from "@/types/api";
import React from "react";

interface UserProfileScreenProps {
	userId?: string;
	profile?: User;
}

export default function UserProfileScreen({
	userId,
	profile: providedProfile,
}: UserProfileScreenProps) {
	const {
		userInfo: fetchedProfile,
		loading: isLoading,
		error,
	} = useProfileApi(userId);
	const profile = providedProfile || fetchedProfile;

	if (isLoading) {
		return <LoadingState message="Loading profile..." />;
	}

	if (error || !profile) {
		return (
			<ErrorState
				title="Loading error"
				message={
					error ||
					(userId ? "User not found" : "Unable to load your profile")
				}
				onRetry={() => window.location.reload()}
			/>
		);
	}

	return <UserProfile profile={profile} />;
}
