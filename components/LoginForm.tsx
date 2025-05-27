import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

interface LoginFormProps {
	onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<PaperSafeAreaView style={styles.container}>
			<Text style={styles.title}>Connexion</Text>
			<TextInput
				label="Identifiant"
				mode="outlined"
				style={styles.input}
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				label="Mot de passe"
				mode="outlined"
				secureTextEntry
				style={styles.input}
				value={password}
				onChangeText={setPassword}
			/>
			<Button mode="contained" onPress={onLogin}>
				Se connecter
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
	input: {
		width: "100%",
	},
});
