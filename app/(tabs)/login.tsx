import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
	return (
		<PaperSafeAreaView style={[styles.container]}>
			<Text style={[styles.title]}>Connexion</Text>
			<TextInput
				label="Identifiant"
				mode="outlined"
				// value={username}
				// onChangeText={setUsername}
				style={styles.input}
			/>
			<TextInput
				label="Mot de passe"
				mode="outlined"
				secureTextEntry
				// value={password}
				// onChangeText={setPassword}
				style={styles.input}
			/>
			<Button mode="contained" onPress={() => {}}>
				Se connecter
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
	input: {
		width: "100%",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
});
