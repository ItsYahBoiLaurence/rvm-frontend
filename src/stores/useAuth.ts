import type { CredentialType } from "@/types/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AuthState = {
    user: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    token: string | null
    validCreds: CredentialType[]
}

export type AuthActions = {
    login: (credentials: CredentialType) => Promise<void>
    logout: () => void
}

export type AuthStore = AuthState & AuthActions

export const useAuthStore = create(
    persist<AuthStore>(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            token: null,
            validCreds: [
                {
                    email: 'johnlaurenceburgos@gmail.com',
                    password: 'Mayan@123!!'
                }
            ],
            login: async (creadentials: CredentialType) => {
                set({
                    user: creadentials.email,
                    isAuthenticated: true,
                    isLoading: false,
                    token: "sample-token",
                })
                const validCreds = get().validCreds
                console.log(validCreds)
            },
            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                    token: null,
                })
            },
        }),
        { name: "auth-storage" }
    )
)