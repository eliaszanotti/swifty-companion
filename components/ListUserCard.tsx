import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

interface User {
	id: number;
	login: string;
	first_name?: string;
	last_name?: string;
	image?: {
		link?: string;
	};
}

interface ListUserCardProps {
	user: User;
	onUserSelect: (userId: string) => void;
}

export default function ListUserCard({
	user,
	onUserSelect,
}: ListUserCardProps) {
	const fullName =
		user.first_name && user.last_name
			? `${user.first_name} ${user.last_name}`
			: user.login;

	const handlePress = () => {
		onUserSelect(user.login);
	};

	return (
		<Card style={{ marginVertical: 8 }} onPress={handlePress}>
			<Card.Content>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Avatar.Image
						size={50}
						source={{
							uri:
								user.image?.link ||
								"https://via.placeholder.com/50",
						}}
					/>
					<View style={{ marginLeft: 16, flex: 1 }}>
						<Text variant="titleMedium">{fullName}</Text>
						<Text variant="bodyMedium" style={{ opacity: 0.7 }}>
							@{user.login}
						</Text>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
}
