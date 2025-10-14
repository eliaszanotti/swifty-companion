# Tamagui Migration Plan

## Overview

Migration from React Native Paper to Tamagui latest (v1.135.2) for Swifty Companion app, leveraging Tamagui's universal theming system and compiler optimizations.

## Current State Analysis

-   **UI Framework**: React Native Paper with MD3 theming
-   **Theme System**: Custom light/dark themes in `constants/PaperTheme.ts`
-   **Components**: PaperView wrapper, LoginForm with Paper components
-   **Navigation**: Expo Router with safe area handling

## Phase 1: Installation & Setup

### 1.1 Dependencies Installation

```bash
pnpm add tamagui@latest @tamagui/config@latest @tamagui/themes@latest
pnpm add -D @tamagui/cli@latest
```

### 1.2 Tamagui Configuration

Create `tamagui.config.ts`:

```typescript
import { createTamagui, createTokens } from "@tamagui/core";
import { themes } from "@tamagui/themes";

const tokens = createTokens({
	color: {
		// Will use Tamagui default themes initially
		...themes.dark.color,
	},
	size: {
		...themes.dark.size,
	},
	space: {
		...themes.dark.space,
	},
	radius: {
		...themes.dark.radius,
	},
	zIndex: {
		...themes.dark.zIndex,
	},
});

export const defaultTheme = themes.dark;
export const lightTheme = themes.light;

export const config = createTamagui({
	tokens,
	themes: {
		light: lightTheme,
		dark: defaultTheme,
	},
	defaultTheme: "light",
	mediaQueryDefaultActive: {
		sm: false,
		md: false,
		lg: false,
		xl: false,
	},
});

export type Conf = typeof config;
declare module "@tamagui/core" {
	interface TamaguiCustomConfig extends Conf {}
}
```

## Phase 2: Theme Migration

### 2.1 Create Tamagui Theme System

Create `constants/TamaguiTheme.ts`:

```typescript
import { createThemes } from "@tamagui/themes";
import { tokens } from "../tamagui.config";

export const TamaguiThemes = createThemes({
	light: {
		bg: tokens.color.white,
		bg1: tokens.color.gray1,
		bg2: tokens.color.gray2,
		bg3: tokens.color.gray3,
		bg4: tokens.color.gray4,
		bg5: tokens.color.gray5,
		bg6: tokens.color.gray6,
		bg7: tokens.color.gray7,
		bg8: tokens.color.gray8,
		bg9: tokens.color.gray9,
		bg10: tokens.color.gray10,
		bg11: tokens.color.gray11,
		bg12: tokens.color.gray12,

		color: tokens.color.black,
		color1: tokens.color.gray1,
		color2: tokens.color.gray2,
		color3: tokens.color.gray3,
		color4: tokens.color.gray4,
		color5: tokens.color.gray5,
		color6: tokens.color.gray6,
		color7: tokens.color.gray7,
		color8: tokens.color.gray8,
		color9: tokens.color.gray9,
		color10: tokens.color.gray10,
		color11: tokens.color.gray11,
		color12: tokens.color.gray12,

		// Brand colors for 42 API
		primary: tokens.color.blue10,
		secondary: tokens.color.purple10,
		accent: tokens.color.green10,

		// Status colors
		success: tokens.color.green10,
		warning: tokens.color.yellow10,
		error: tokens.color.red10,
		info: tokens.color.blue10,
	},
	dark: {
		bg: tokens.color.black,
		bg1: tokens.color.gray1,
		bg2: tokens.color.gray2,
		bg3: tokens.color.gray3,
		bg4: tokens.color.gray4,
		bg5: tokens.color.gray5,
		bg6: tokens.color.gray6,
		bg7: tokens.color.gray7,
		bg8: tokens.color.gray8,
		bg9: tokens.color.gray9,
		bg10: tokens.color.gray10,
		bg11: tokens.color.gray11,
		bg12: tokens.color.gray12,

		color: tokens.color.white,
		color1: tokens.color.gray1,
		color2: tokens.color.gray2,
		color3: tokens.color.gray3,
		color4: tokens.color.gray4,
		color5: tokens.color.gray5,
		color6: tokens.color.gray6,
		color7: tokens.color.gray7,
		color8: tokens.color.gray8,
		color9: tokens.color.gray9,
		color10: tokens.color.gray10,
		color11: tokens.color.gray11,
		color12: tokens.color.gray12,

		// Brand colors for 42 API
		primary: tokens.color.blue9,
		secondary: tokens.color.purple9,
		accent: tokens.color.green9,

		// Status colors
		success: tokens.color.green9,
		warning: tokens.color.yellow9,
		error: tokens.color.red9,
		info: tokens.color.blue9,
	},
});
```

### 2.2 Theme Provider Setup

Create `hooks/useTamaguiTheme.ts`:

```typescript
import { useTheme as useTamaguiTheme } from "@tamagui/core";
import { useColorScheme } from "react-native";

export function useTheme() {
	const tamaguiTheme = useTamaguiTheme();
	const colorScheme = useColorScheme();

	return {
		...tamaguiTheme,
		colorScheme,
		isDark: colorScheme === "dark",
	};
}
```

## Phase 3: Component Migration

### 3.1 Core Component Setup

Create `components/TamaguiView.tsx`:

```typescript
import { YStack, YStackProps } from "tamagui";
import { useTheme } from "../hooks/useTamaguiTheme";

export default function TamaguiView(props: YStackProps) {
	const theme = useTheme();

	return <YStack backgroundColor="$background" flex={1} {...props} />;
}
```

### 3.2 Update Root Layout

Update `app/_layout.tsx`:

```typescript
import React from "react";
import TamaguiView from "@/components/TamaguiView";
import { TamaguiProvider, Theme } from "@tamagui/core";
import { config } from "../tamagui.config";
import { AuthProvider } from "@/hooks/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuthContext";

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<TamaguiProvider config={config}>
				<AuthProvider>
					<RootLayoutContent />
				</AuthProvider>
			</TamaguiProvider>
		</SafeAreaProvider>
	);
}

function RootLayoutContent() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	const { isLoggedIn, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading) {
			if (isLoggedIn) {
				router.replace("/(tabs)");
			} else {
				router.replace("/");
			}
		}
	}, [isLoggedIn, isLoading]);

	return (
		<Theme name={colorScheme === "dark" ? "dark" : "light"}>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<TamaguiView style={{ paddingTop: insets.top }}>
					<Stack>
						<Stack.Screen
							name="index"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false, animation: "fade" }}
						/>
						<Stack.Screen
							name="user/[login]"
							options={{
								headerShown: false,
								presentation: "modal",
							}}
						/>
					</Stack>
				</TamaguiView>
				<StatusBar
					style={colorScheme === "dark" ? "light" : "dark"}
					backgroundColor="transparent"
				/>
			</ThemeProvider>
		</Theme>
	);
}
```

### 3.3 Migrate LoginForm

Update `components/auth/LoginForm.tsx`:

```typescript
import TamaguiView from "@/components/TamaguiView";
import { useAuth } from "@/hooks/useAuthContext";
import { useTheme } from "@/hooks/useTamaguiTheme";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { YStack, XStack, Text, Button, Card, H1, H2, Paragraph } from "tamagui";

interface LoginFormProps {
	onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
	const { login, isLoggedIn, isLoading } = useAuth();
	const theme = useTheme();

	const handleLogin = async () => {
		await login();
		onLoginSuccess?.();
	};

	if (isLoggedIn) {
		return (
			<YStack
				flex={1}
				justifyContent="center"
				alignItems="center"
				gap="$4"
			>
				<ActivityIndicator size="large" />
				<Text fontStyle="italic">Connexion réussie!</Text>
			</YStack>
		);
	}

	return (
		<TamaguiView flex={1}>
			{/* Custom header equivalent */}
			<YStack
				backgroundColor="$background"
				padding="$4"
				borderBottomWidth={1}
				borderBottomColor="$borderColor"
			>
				<H1>Connexion</H1>
			</YStack>

			<YStack flex={1} justifyContent="center" padding="$4">
				<Card elevate size="$4" padding="$6">
					<YStack alignItems="center" gap="$6">
						<H1 textAlign="center">Swifty Companion</H1>
						<Paragraph size="$4" textAlign="center" lineHeight="$4">
							Connectez-vous avec votre compte 42 pour accéder à
							votre profil
						</Paragraph>

						<YStack alignSelf="flex-start" width="100%" gap="$3">
							<Text size="$3" fontWeight="600">
								Avec la connexion, vous pouvez :
							</Text>
							<YStack paddingLeft="$2">
								<Text>• Voir votre profil complet</Text>
								<Text>
									• Consulter vos compétences et projets
								</Text>
								<Text>• Rechercher d'autres étudiants</Text>
							</YStack>
						</YStack>

						<Button
							size="$4"
							backgroundColor="$primary"
							color="white"
							onPress={handleLogin}
							disabled={isLoading}
							width="100%"
							marginTop="$2"
						>
							{isLoading
								? "Connexion..."
								: "Se connecter avec 42"}
						</Button>

						<Text
							size="$2"
							textAlign="center"
							fontStyle="italic"
							opacity={0.7}
							marginTop="$2"
						>
							Vos identifiants sont sécurisés avec OAuth2
						</Text>
					</YStack>
				</Card>
			</YStack>
		</TamaguiView>
	);
}
```

## Phase 4: Component Library Migration

### 4.1 Create Base Components

Create `components/tamagui/index.ts`:

```typescript
export { default as TamaguiView } from "./TamaguiView";
export { default as TamaguiCard } from "./TamaguiCard";
export { default as TamaguiButton } from "./TamaguiButton";
export { default as TamaguiText } from "./TamaguiText";
```

### 4.2 Common Patterns

Create `components/tamagui/TamaguiCard.tsx`:

```typescript
import { Card, CardProps } from "tamagui";

export interface TamaguiCardProps extends CardProps {
	children: React.ReactNode;
}

export default function TamaguiCard({ children, ...props }: TamaguiCardProps) {
	return (
		<Card elevate size="$4" padding="$4" {...props}>
			{children}
		</Card>
	);
}
```

## Phase 5: Migration Strategy

### 5.1 Incremental Migration Approach

1. **Week 1**: Setup Tamagui alongside React Native Paper
2. **Week 2**: Migrate theme system and provider
3. **Week 3**: Migrate core components (View, Text, Button)
4. **Week 4**: Migrate forms and interactive components
5. **Week 5**: Remove React Native Paper dependencies
6. **Week 6**: Optimize with Tamagui compiler

### 5.2 Parallel Development

-   Keep React Native Paper components during migration
-   Use feature flags to switch between systems
-   Test both systems in parallel
-   Gradual component replacement

### 5.3 Testing Strategy

-   Visual regression testing for theme consistency
-   Component library testing with Storybook (optional)
-   Cross-platform testing (iOS, Android, Web)
-   Performance comparison

## Phase 6: Performance Optimization

### 6.1 Compiler Configuration

Enable Tamagui compiler in `tamagui.config.ts`:

```typescript
export const config = createTamagui({
	// ... existing config

	// Compiler optimizations
	strictTokens: true,
	shouldFlattenWeb: true,

	// Extract properties for better performance
	extract: true,
});
```

### 6.2 Bundle Optimization

-   Enable tree shaking for unused components
-   Use dynamic imports for heavy components
-   Optimize bundle size with compiler

## Phase 7: Post-Migration

### 7.1 Remove Old Dependencies

```bash
pnpm remove react-native-paper react-native-paper/themes
rm constants/PaperTheme.ts
rm components/PaperView.tsx
```

### 7.2 Documentation Updates

-   Update CLAUDE.md with new component references
-   Document new theming approach
-   Update development guidelines

## Benefits of Migration

1. **Performance**: Tamagui compiler optimizes styles at build time
2. **Bundle Size**: Smaller bundles with tree shaking
3. **Universal**: True code sharing between web and native
4. **Developer Experience**: Better TypeScript support and DX
5. **Theming**: More flexible theming system
6. **Animation**: Built-in animation support

## Risk Mitigation

1. **Backup**: Create git branch before migration
2. **Testing**: Comprehensive test coverage
3. **Rollback**: Keep React Native Paper until migration complete
4. **Documentation**: Document all changes and patterns
5. **Performance**: Monitor app performance during migration

## Timeline Estimate

-   **Phase 1-2**: 2-3 days
-   **Phase 3-4**: 1-2 weeks
-   **Phase 5**: 1 week (parallel migration)
-   **Phase 6**: 2-3 days
-   **Phase 7**: 1-2 days

**Total Estimated Time**: 2-3 weeks for complete migration

## Success Criteria

-   [ ] All components migrated to Tamagui
-   [ ] Theme consistency maintained
-   [ ] No performance regression
-   [ ] Bundle size reduced
-   [ ] Cross-platform parity maintained
-   [ ] Developer documentation updated
