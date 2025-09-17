import { useSupabaseAuth } from "@/stores";
import { useEffect, type ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const initialize = useSupabaseAuth(state => state.initialize)

    useEffect(() => {
        initialize()
    }, [initialize])

    return children
}