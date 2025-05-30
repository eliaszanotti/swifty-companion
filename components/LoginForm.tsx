import PaperSafeAreaView from "@/components/PaperSafeAreaView";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface LoginFormProps {
	onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	return (
		<PaperSafeAreaView>
			<View style={styles.content}>
				<Card mode="elevated" style={styles.card}>
					<Card.Content style={styles.cardContent}>
						<Text variant="headlineMedium">Connectez-vous</Text>
						<Text variant="bodyLarge">
							Connectez-vous avec votre compte 42
						</Text>
					</Card.Content>
					<Card.Actions>
						<Button mode="contained" onPress={onLogin} icon="login">
							Se connecter avec 42
						</Button>
					</Card.Actions>
				</Card>
			</View>
		</PaperSafeAreaView>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
	},
	card: {
		padding: 16,
		gap: 32,
	},
	cardContent: {
		marginBottom: 32,
		gap: 16,
	},
});
