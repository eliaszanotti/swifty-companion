import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
	return (
		<PaperSafeAreaView style={styles.container}>
			<Text style={styles.title}>Connexion</Text>
			<TextInput
				label="Identifiant"
				mode="outlined"
				style={styles.input}
				// value={username}
				// onChangeText={setUsername}
			/>
			<TextInput
				label="Mot de passe"
				mode="outlined"
				secureTextEntry
				style={styles.input}
				// value={password}
				// onChangeText={setPassword}
			/>
			<Button mode="contained" onPress={() => {}}>
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
