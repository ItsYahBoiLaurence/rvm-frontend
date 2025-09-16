import { useAuthStore } from "@/stores";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />
}