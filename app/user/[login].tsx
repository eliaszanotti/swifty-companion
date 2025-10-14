import PaperView from "@/components/PaperView";
import UserProfileScreen from "@/components/user/UserProfileScreen";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

export default function UserProfilePage() {
	const { login } = useLocalSearchParams();

	return (
		<PaperView>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Profile" />
			</Appbar.Header>
			<UserProfileScreen userId={login as string} />
		</PaperView>
	);
}
