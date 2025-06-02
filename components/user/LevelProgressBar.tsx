import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import CustomProgressBar from "../ui/CustomProgressBar";

interface LevelProgressBarProps {
	currentLevel: {
		level: number;
		grade?: string;
	};
}

export default function LevelProgressBar({
	currentLevel,
}: LevelProgressBarProps) {
	const theme = useTheme();

	return (
		<View style={styles.levelSection}>
			<View style={styles.levelSection}>
				<View style={styles.levelHeader}>
					<Text
						style={[
							styles.levelText,
							{ color: theme.colors.onSurface },
						]}
					>
						Level {Math.floor(currentLevel?.level || 0)}
					</Text>
					<Text
						style={[
							styles.levelProgress,
							{
								color: theme.colors.onSurfaceVariant,
							},
						]}
					>
						{(((currentLevel?.level || 0) % 1) * 100).toFixed(0)}%
					</Text>
				</View>
				<CustomProgressBar
					progress={currentLevel.level % 1}
					color={theme.colors.primary}
				/>
				<Text
					style={[
						styles.gradeText,
						{
							color: theme.colors.onSurfaceVariant,
						},
					]}
				>
					{currentLevel?.grade}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	levelSection: {
		marginTop: 16,
		gap: 8,
	},
	levelHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	levelText: {
		fontSize: 14,
	},
	levelProgress: {
		fontSize: 12,
	},
	gradeText: {
		fontSize: 12,
		fontStyle: "italic",
	},
});
