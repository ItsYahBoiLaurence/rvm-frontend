import { create } from "zustand";
import { type User, type Session, type WeakPassword, AuthError } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase";
import type { CredentialType } from "@/types/auth";

export type AuthResponseType = {
    data: {
        user: User
        session: Session
        weakPassword?: WeakPassword
    } | null
    error: null | unknown
}

export type SupabaseAuthState = {
    user: User | null
    session: Session | null
    loading: boolean

}

export type SupabaseAuthActions = {
    initialize: () => Promise<void>
    signIn: (creds: CredentialType) => Promise<AuthResponseType>
    signOut: () => Promise<void>
}

export type SupabaseAuthStore = SupabaseAuthActions & SupabaseAuthState


export const useSupabaseAuth = create<SupabaseAuthStore>(
    (set, get) => ({
        user: null,
        session: null,
        loading: true,

        initialize: async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                set({
                    session,
                    user: session?.user ?? null,
                    loading: false
                })

                supabase.auth.onAuthStateChange((_, session) => {
                    set({
                        session,
                        user: session?.user ?? null,
                        loading: false
                    })
                })
            } catch (error) {
                console.error('Error initializing auth:', error)
                set({
                    loading: false
                })
            }
        },

        signIn: async (credentials: CredentialType) => {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ ...credentials })
                if (error) throw error
                return { data, error: null }
            } catch (error) {

                if (error instanceof AuthError) {
                    return { data: null, error: error.code }
                }

                return { data: null, error }
            }
        },

        signOut: async () => {
            try {
                const { error } = await supabase.auth.signOut()
                if (error) throw error
                set({
                    user: null,
                    session: null
                })
            } catch (error) {
                console.error('Error signing out:', error)
            }
        },

        getAccessToken: () => {
            const { session } = get()
            return session?.access_token
        }
    })
)