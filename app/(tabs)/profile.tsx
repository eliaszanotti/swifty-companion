import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	if (!isLoggedIn) {
		return (
			<View
				style={[
					styles.container,
					{ backgroundColor: theme.colors.background },
				]}
			>
				<Text style={[styles.title, { color: theme.colors.onSurface }]}>
					Connexion
				</Text>
				<TextInput
					label="Identifiant"
					mode="outlined"
					value={username}
					onChangeText={setUsername}
					style={styles.input}
				/>
				<TextInput
					label="Mot de passe"
					mode="outlined"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					style={styles.input}
				/>
				<Button mode="contained" onPress={() => setIsLoggedIn(true)}>
					Se connecter
				</Button>
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
			]}
		>
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
		</View>
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
	input: {
		width: "100%",
	},
});
