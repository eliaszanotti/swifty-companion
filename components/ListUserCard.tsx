import { View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import UserInfo from "./user/UserInfo";

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
						<UserInfo
							login={user.login}
							firstName={user.first_name}
							lastName={user.last_name}
						/>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
}
