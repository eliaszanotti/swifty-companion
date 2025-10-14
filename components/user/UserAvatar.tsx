import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface UserAvatarProps {
	imageUrl?: string;
	login: string;
	size?: "small" | "large";
}

export default function UserAvatar({
	imageUrl,
	login,
	size = "small",
}: UserAvatarProps) {
	const getSizeConfig = () => {
		switch (size) {
			case "large":
				return {
					width: 80,
					height: 80,
					borderRadius: 40,
					fontSize: "titleMedium" as const,
				};
			default:
				return {
					width: 48,
					height: 48,
					borderRadius: 24,
					fontSize: "headlineMedium" as const,
				};
		}
	};

	const sizeConfig = getSizeConfig();

	return (
		<>
			{imageUrl ? (
				<Image
					source={{ uri: imageUrl }}
					style={[
						styles.avatar,
						{
							width: sizeConfig.width,
							height: sizeConfig.height,
							borderRadius: sizeConfig.borderRadius,
						},
					]}
				/>
			) : (
				<View
					style={[
						styles.avatar,
						styles.avatarPlaceholder,
						{
							width: sizeConfig.width,
							height: sizeConfig.height,
							borderRadius: sizeConfig.borderRadius,
						},
					]}
				>
					<Text variant={sizeConfig.fontSize}>
						{login.charAt(0).toUpperCase()}
					</Text>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	avatar: {
		backgroundColor: "transparent",
	},
	avatarPlaceholder: {
		backgroundColor: "#e0e0e0",
		justifyContent: "center",
		alignItems: "center",
	},
});
