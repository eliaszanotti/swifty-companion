import type { MD3Theme } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";

export const LightPaperTheme: MD3Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#007BFF",
		onPrimary: "#FFFFFF",
		primaryContainer: "#CCE5FF",
		onPrimaryContainer: "#001F3F",
		secondary: "#6C757D",
		onSecondary: "#FFFFFF",
		secondaryContainer: "#E2E3E5",
		onSecondaryContainer: "#212529",
		error: "#DC3545",
		onError: "#FFFFFF",
		errorContainer: "#F8D7DA",
		onErrorContainer: "#721C24",

		background: "#F8F9FA",
		onBackground: "#212529",
		surface: "#FFFFFF",
		onSurface: "#212529",
		surfaceVariant: "#DEE2E6",
		onSurfaceVariant: "#495057",

		outline: "#ADB5BD",
		outlineVariant: "#CED4DA",
		inverseSurface: "#343A40",
		inverseOnSurface: "#F8F9FA",
		inversePrimary: "#90CAF9",
		shadow: "#000000",
		scrim: "#000000",
	},
};

export const DarkPaperTheme: MD3Theme = {
	...LightPaperTheme,
	colors: {
		...LightPaperTheme.colors,
		background: "#121212",
		onBackground: "#FFFFFF",
		surface: "#1E1E1E",
		onSurface: "#FFFFFF",
		surfaceVariant: "#333333",
		onSurfaceVariant: "#CCCCCC",
	},
};
