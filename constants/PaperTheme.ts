import type { MD3Theme } from "react-native-paper";
import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

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
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: "#90CAF9",
		onPrimary: "#212529",
		primaryContainer: "#0D47A1",
		onPrimaryContainer: "#E3F2FD",
		secondary: "#B0BEC5",
		onSecondary: "#212529",
		secondaryContainer: "#455A64",
		onSecondaryContainer: "#ECEFF1",
		tertiary: "#A5D6A7",
		onTertiary: "#212529",
		tertiaryContainer: "#2E7D32",
		onTertiaryContainer: "#E8F5E9",
		error: "#EF9A9A",
		onError: "#420E0E",
		errorContainer: "#B71C1C",
		onErrorContainer: "#FFEBEE", // Light text on error container

		// Background and surface colors (standard dark mode)
		background: "#121212", // Very dark background
		onBackground: "#FFFFFF", // White text on background
		surface: "#1E1E1E", // Dark surface
		onSurface: "#FFFFFF", // White text on surface
		surfaceVariant: "#333333", // Slightly lighter dark surface variant
		onSurfaceVariant: "#CCCCCC", // Lighter text on surface variant

		// Outline and divider colors
		outline: "#666666", // Medium gray for outlines
		outlineVariant: "#555555", // Darker gray for outline variants
		inverseSurface: "#E0E0E0", // Light inverse surface
		inverseOnSurface: "#121212", // Dark text on inverse surface
		inversePrimary: "#1976D2", // Dark blue inverse primary
		shadow: "#000000", // Black shadow
		scrim: "#000000", // Black scrim
	},
};
