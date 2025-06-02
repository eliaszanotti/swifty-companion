import { useAuth } from "@/auth/AuthContext";
import LoginForm from "@/components/LoginForm";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import UserCard from "@/components/UserCard";
import SkillCard from "@/components/user/SkillCard";

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { isLoggedIn, login, accessToken } = useAuth();
	const [userInfo, setUserInfo] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isLoggedIn || !accessToken) return;

		const fetchUserInfo = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://api.intra.42.fr/v2/me", {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (response.ok) {
					const userData = await response.json();
					setUserInfo(userData);
				} else {
					console.error(
						"Failed to fetch user info:",
						response.status
					);
				}
			} catch (error) {
				console.error("Error fetching user info:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserInfo();
	}, [isLoggedIn, accessToken]);

	if (!isLoggedIn) {
		return <LoginForm onLogin={login} />;
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<PaperSafeAreaView style={styles.container}>
				{userInfo && <UserCard user={userInfo} />}
				{userInfo && <SkillCard cursusUsers={userInfo.cursus_users} />}

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
});
