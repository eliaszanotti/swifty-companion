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
		return <LoadingState message="Chargement du profil..." />;
	}

	if (error || !profile) {
		return (
			<ErrorState
				title="Erreur de chargement"
				message={
					error ||
					(userId
						? "Utilisateur non trouvé"
						: "Impossible de charger votre profil")
				}
				onRetry={userId ? undefined : () => window.location.reload()}
				dismissText={userId ? "Retour" : undefined}
				retryText={userId ? undefined : "Réessayer"}
			/>
		);
	}

	return <UserProfile profile={profile} />;
}
