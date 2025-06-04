import PaperView from "@/components/PaperView";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import UserProfile from "./UserProfile";

interface UserDetailProps {
	userId: string;
	onBack: () => void;
}

export default function UserDetail({ userId, onBack }: UserDetailProps) {
	useEffect(() => {
		const backAction = () => {
			onBack();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, [onBack]);

	return (
		<PaperView style={{ flex: 1, paddingHorizontal: 0 }}>
			<IconButton
				icon="arrow-left"
				mode="contained"
				onPress={onBack}
				style={styles.backButton}
			/>
			<UserProfile userId={userId} />
		</PaperView>
	);
}

const styles = StyleSheet.create({
	backButton: {
		alignSelf: "flex-start",
		margin: 16,
	},
});
