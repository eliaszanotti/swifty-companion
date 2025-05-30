import { useAuth } from "@/auth/AuthContext";
import LoginForm from "@/components/LoginForm";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { isLoggedIn, login, logout, authCode } = useAuth();

	if (!isLoggedIn) {
		return <LoginForm onLogin={login} />;
	}

	return (
		<PaperSafeAreaView style={styles.container}>
			<Card>
				<Card.Content>
					<Text
						style={[
							styles.title,
							{ color: theme.colors.onSurface },
						]}
					>
						✅ Connexion réussie !
					</Text>
					<Text
						style={[
							styles.label,
							{ color: theme.colors.onSurface },
						]}
					>
						Code d&apos;autorisation reçu :
					</Text>
					<View style={styles.codeContainer}>
						<Text
							style={[
								styles.code,
								{ color: theme.colors.primary },
							]}
						>
							{authCode}
						</Text>
					</View>
					<Text
						style={[styles.info, { color: theme.colors.onSurface }]}
					>
						🎉 Prochaine étape : échanger ce code contre un token !
					</Text>
				</Card.Content>
				<Card.Actions>
					<Button mode="outlined" onPress={logout}>
						Déconnexion
					</Button>
				</Card.Actions>
			</Card>
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
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: "600",
	},
	codeContainer: {
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	code: {
		fontFamily: "monospace",
		fontSize: 12,
		textAlign: "center",
	},
	info: {
		fontSize: 14,
		textAlign: "center",
		fontStyle: "italic",
	},
});
