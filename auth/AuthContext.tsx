import { Config } from "@/constants/Config";
import * as AuthSession from "expo-auth-session";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
	isLoggedIn: boolean;
	login: () => Promise<void>;
	logout: () => void;
	authCode: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authCode, setAuthCode] = useState<string | null>(null);

	const redirectUri = AuthSession.makeRedirectUri({
		scheme: "swifty-companion",
	});

	console.log("📱 Redirect URI utilisé:", redirectUri);

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: Config.CLIENT_ID,
			scopes: ["public"],
			redirectUri: redirectUri,
			responseType: AuthSession.ResponseType.Code,
		},
		{
			authorizationEndpoint: `${Config.API_BASE_URL}/oauth/authorize`,
		}
	);

	React.useEffect(() => {
		if (response?.type === "success") {
			console.log("✅ Succès! Code reçu:", response.params.code);
			setAuthCode(response.params.code);
			setIsLoggedIn(true);
		} else if (response?.type === "error") {
			console.log("❌ Erreur:", response.error);
		} else if (response?.type === "cancel") {
			console.log("🚫 Annulé par l'utilisateur");
		}
	}, [response]);

	const login = async () => {
		try {
			console.log("🚀 Ouverture de la page 42...");
			await promptAsync();
		} catch (error) {
			console.error("❌ Erreur lors de l'ouverture:", error);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		setAuthCode(null);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout, authCode }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
