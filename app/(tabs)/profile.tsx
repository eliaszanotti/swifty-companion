import { useAuth } from "@/auth/AuthContext";
import LoginForm from "@/components/LoginForm";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { isLoggedIn, login, logout } = useAuth();

	if (!isLoggedIn) {
		return <LoginForm onLogin={login} />;
	}

	return (
		<PaperSafeAreaView style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.onSurface }]}>
				Profile
			</Text>
			<Text style={{ color: theme.colors.onSurface }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</Text>
			<Button mode="contained" onPress={logout}>
				Déconnexion
			</Button>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
});
