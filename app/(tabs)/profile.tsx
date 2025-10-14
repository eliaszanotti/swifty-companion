import PaperView from "@/components/PaperView";
import UserProfileScreen from "@/components/user/UserProfileScreen";
import { useAuth } from "@/hooks/useAuthContext";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";

export default function ProfileTab() {
	const { logout, isLoading } = useAuth();
	const [showLogoutDialog, setShowLogoutDialog] = useState(false);

	const handleLogout = () => {
		setShowLogoutDialog(true);
	};

	const confirmLogout = async () => {
		setShowLogoutDialog(false);
		try {
			await logout();
		} catch {
			Alert.alert("Error", "Failed to logout. Please try again.");
		}
	};

	return (
		<PaperView>
			<Appbar.Header>
				<Appbar.Content title="Profile" />
				<Appbar.Action
					icon="logout"
					onPress={handleLogout}
					disabled={isLoading}
				/>
			</Appbar.Header>

			<UserProfileScreen />

			<Portal>
				<Dialog
					visible={showLogoutDialog}
					onDismiss={() => setShowLogoutDialog(false)}
				>
					<Dialog.Title>Confirm Logout</Dialog.Title>
					<Dialog.Content>
						<Text>Are you sure you want to logout?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() => setShowLogoutDialog(false)}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button
							onPress={confirmLogout}
							mode="contained"
							loading={isLoading}
							disabled={isLoading}
						>
							Logout
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</PaperView>
	);
}
