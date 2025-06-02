import React from "react";
import { Avatar as PaperAvatar, useTheme } from "react-native-paper";

interface AvatarProps {
	size?: number;
	imageUrl?: string;
	login?: string;
	style?: any;
}

export default function Avatar({
	size = 60,
	imageUrl,
	login,
	style,
}: AvatarProps) {
	const theme = useTheme();

	const getInitials = () => {
		if (!login) return "??";
		return login.substring(0, 2).toUpperCase();
	};

	if (imageUrl) {
		return (
			<PaperAvatar.Image
				size={size}
				source={{ uri: imageUrl }}
				style={[{ borderRadius: size / 2 }, style]}
			/>
		);
	}

	return (
		<PaperAvatar.Text
			size={size}
			label={getInitials()}
			style={[
				{
					backgroundColor: theme.colors.primary,
					borderRadius: size / 2,
				},
				style,
			]}
		/>
	);
}
