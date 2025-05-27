import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Provider, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// Placeholder pour l'état de connexion, pas de logique réelle pour l'instant
	const isLoggedIn = false; // Mettez ceci à jour avec la logique de connexion réelle plus tard

	return (
		<Provider>
			<Appbar.Header>
				<Appbar.Content title="Connexion 42 API" />
			</Appbar.Header>
			<View style={styles.container}>
				<Text variant="titleMedium" style={styles.statusText}>
					État de la connexion:{" "}
					{isLoggedIn ? "Connecté" : "Déconnecté"}
				</Text>

				{!isLoggedIn && (
					<View style={styles.form}>
						<TextInput
							label="Identifiant (UID Client)"
							value={username}
							onChangeText={(text) => setUsername(text)}
							mode="outlined"
							style={styles.input}
						/>
						<TextInput
							label="Secret Client"
							value={password}
							onChangeText={(text) => setPassword(text)}
							mode="outlined"
							secureTextEntry
							style={styles.input}
						/>
						<Button
							mode="contained"
							onPress={() => console.log("Login pressed")}
							style={styles.button}
						>
							Se connecter
						</Button>
					</View>
				)}

				{isLoggedIn && (
					<Button
						mode="contained"
						onPress={() => console.log("Logout pressed")}
						style={styles.button}
					>
						Se déconnecter
					</Button>
				)}
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	statusText: {
		marginBottom: 24,
	},
	form: {
		width: "100%",
		maxWidth: 300, // Limiter la largeur du formulaire sur les grands écrans
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 8,
	},
});
