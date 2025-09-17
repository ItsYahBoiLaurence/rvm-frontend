import { useSupabaseAuth } from "@/stores";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {

    const { user, loading } = useSupabaseAuth()

    if (loading) return <div>Loading</div>

    if (!user) return <Navigate to={'sign-in'} replace />

    return <>{children}</>
}