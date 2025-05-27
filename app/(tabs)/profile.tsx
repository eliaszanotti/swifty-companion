import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	if (!isLoggedIn) {
		return <Redirect href="/login" />;
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
			<Button mode="contained" onPress={() => setIsLoggedIn(false)}>
				Déconnexion
			</Button>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
		gap: 16,
	},
	title: {
		fontSize: 32,
		width: "100%",
		fontWeight: "bold",
		textAlign: "center",
	},
});
