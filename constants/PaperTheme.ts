import type { MD3Theme } from "react-native-paper";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const LightPaperTheme: MD3Theme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
	},
};

export const DarkPaperTheme: MD3Theme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
	},
};
