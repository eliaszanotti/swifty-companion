import PaperView from "@/components/PaperView";
import UserProfileScreen from "@/components/user/UserProfileScreen";
import { useAuth } from "@/hooks/useAuthContext";
import React from "react";
import { Appbar } from "react-native-paper";

export default function ProfileTab() {
	const { logout } = useAuth();

	return (
		<PaperView>
			<Appbar.Header>
				<Appbar.Content title="Profile" />
				<Appbar.Action icon="logout" onPress={logout} />
			</Appbar.Header>
			<UserProfileScreen />
		</PaperView>
	);
}
