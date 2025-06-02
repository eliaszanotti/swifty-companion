import { useAuth } from "@/auth/AuthContext";
import LoginForm from "@/components/LoginForm";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import UserCard from "@/components/UserCard";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { isLoggedIn, login, logout, accessToken } = useAuth();
	const [userInfo, setUserInfo] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const fetchUserInfo = async () => {
		if (!accessToken) return;

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
				console.log("User info fetched:", userData.login);
			} else {
				console.error("Failed to fetch user info:", response.status);
			}
		} catch (error) {
			console.error("Error fetching user info:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			fetchUserInfo();
		}
	}, [isLoggedIn, accessToken]);

	if (!isLoggedIn) {
		return <LoginForm onLogin={login} />;
	}

	return (
		<PaperSafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{userInfo && <UserCard user={userInfo} />}

				{loading && (
					<Text
						style={[
							styles.loading,
							{ color: theme.colors.onSurface },
						]}
					>
						Chargement des infos utilisateur...
					</Text>
				)}

				<Card style={styles.tokenCard}>
					<Card.Content>
						<Text
							style={[
								styles.sectionTitle,
								{ color: theme.colors.onSurface },
							]}
						>
							🔑 Token d&apos;accès
						</Text>

						<View
							style={[
								styles.tokenContainer,
								{ borderColor: theme.colors.primary },
							]}
						>
							<Text
								style={[
									styles.token,
									{ color: theme.colors.primary },
								]}
								selectable={true}
							>
								{accessToken || "Chargement du token..."}
							</Text>
						</View>

						<Text
							style={[
								styles.info,
								{ color: theme.colors.onSurface },
							]}
						>
							💡 Token utilisé pour récupérer les données depuis
							l&apos;API 42
						</Text>
					</Card.Content>
					<Card.Actions>
						<Button mode="outlined" onPress={logout}>
							Déconnexion
						</Button>
						<Button
							mode="contained"
							onPress={fetchUserInfo}
							disabled={loading}
						>
							Actualiser
						</Button>
					</Card.Actions>
				</Card>
			</ScrollView>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		gap: 16,
		padding: 8,
	},
	loading: {
		textAlign: "center",
		fontStyle: "italic",
		marginVertical: 16,
	},
	tokenCard: {
		margin: 8,
	},
	sectionTitle: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: "600",
		textAlign: "center",
	},
	tokenContainer: {
		backgroundColor: "#f0f8ff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		borderWidth: 2,
	},
	token: {
		fontFamily: "monospace",
		fontSize: 10,
		textAlign: "center",
		lineHeight: 14,
	},
	info: {
		fontSize: 14,
		textAlign: "center",
		fontStyle: "italic",
		marginBottom: 12,
	},
});
