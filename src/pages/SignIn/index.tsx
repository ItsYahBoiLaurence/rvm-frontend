import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores"
import type { CredentialType } from "@/types/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const creds: CredentialType = {
    email: 'johnlaurenceburgos@gmail.com',
    password: "Mayan@123!!"
}

export function SignIn() {
    const { login, isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/', { replace: true })
    }, [navigate, isAuthenticated])

    const handleSubmit = async (creds: CredentialType) => {
        await login(creds)
        if (useAuthStore.getState().isAuthenticated) {
            navigate('/')
        }
    }
    return (
        <>
            <p>Sign In</p>
            <Button onClick={() => handleSubmit(creds)}>set</Button>
        </>
    )
}