import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Button, Provider, TextInput } from "react-native-paper";

export default function ProfileScreen() {
	// Placeholder pour l'état de connexion, pas de logique réelle pour l'instant
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialisé à false
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	const handleLogin = () => {
		// Ici, vous implémenterez la logique de connexion réelle plus tard
		console.log("Attempting login with:", username, password);
		// Après une connexion réussie, vous devriez appeler setIsLoggedIn(true);
		// Pour l'instant, je vais simuler une connexion réussie après 2 secondes
		setTimeout(() => {
			setIsLoggedIn(true);
		}, 2000);
	};

	const handleLogout = () => {
		// Ici, vous implémenterez la logique de déconnexion réelle plus tard
		console.log("Logging out");
		setIsLoggedIn(false);
	};

	return (
		<Provider>
			<Appbar.Header>
				<Appbar.Content title="Profil 42" />
			</Appbar.Header>
			<View style={styles.container}>
				{!isLoggedIn ? (
					// Contenu affiché si déconnecté
					<View style={styles.disconnectedContainer}>
						<Text style={styles.statusText}>
							Vous êtes déconnecté.
						</Text>
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
								onPress={handleLogin}
								style={styles.button}
							>
								Se connecter
							</Button>
						</View>
					</View>
				) : (
					// Contenu affiché si connecté
					<View style={styles.loggedInContainer}>
						<Text style={styles.statusText}>
							Vous êtes connecté !
						</Text>
						{/* Ici, vous ajouterez le contenu réel du profil de l'utilisateur */}
						<Text>Contenu du profil de l'utilisateur...</Text>
						<Button
							mode="outlined"
							onPress={handleLogout}
							style={styles.button}
						>
							Se déconnecter
						</Button>
					</View>
				)}
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	disconnectedContainer: {
		width: "100%",
		alignItems: "center",
	},
	loggedInContainer: {
		width: "100%",
		alignItems: "center",
	},
	statusText: {
		fontSize: 18,
		marginBottom: 24,
	},
	form: {
		width: "100%",
		maxWidth: 300,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 8,
	},
});
