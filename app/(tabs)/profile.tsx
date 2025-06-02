import { useAuth } from "@/auth/AuthContext";
import LoginForm from "@/components/LoginForm";
import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";

export default function ProfileScreen() {
	const theme = useTheme();
	const { isLoggedIn, login, logout, accessToken } = useAuth();

	if (!isLoggedIn) {
		return <LoginForm onLogin={login} />;
	}

	return (
		<PaperSafeAreaView>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Card>
					<Card.Content>
						<Text
							style={[
								styles.sectionTitle,
								{ color: theme.colors.onSurface },
							]}
						>
							Access Token
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
					</Card.Content>
					<Card.Actions>
						<Button mode="outlined" onPress={logout}>
							Déconnexion
						</Button>
					</Card.Actions>
				</Card>
			</ScrollView>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	sectionTitle: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: "600",
		textAlign: "center",
	},
	codeContainer: {
		backgroundColor: "#f0f8ff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		borderWidth: 2,
	},
	code: {
		fontFamily: "monospace",
		fontSize: 10,
		textAlign: "center",
		lineHeight: 14,
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
	divider: {
		marginVertical: 16,
	},
	info: {
		fontSize: 14,
		textAlign: "center",
		fontStyle: "italic",
		marginBottom: 12,
	},
	explanation: {
		fontSize: 12,
		textAlign: "left",
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 6,
		marginTop: 8,
	},
});
