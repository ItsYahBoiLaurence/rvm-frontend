import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/stores"
import type { CredentialType } from "@/types/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export function SignIn() {

    const form = useForm<CredentialType>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { login, isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/', { replace: true })
    }, [navigate, isAuthenticated])

    const submit = async (creds: CredentialType) => {
        await login(creds)
        console.log(creds)
        if (useAuthStore.getState().isAuthenticated) {
            navigate('/')
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="border w-[400px]  p-[20px] flex flex-col gap-2 rounded-lg">
                <p className="text-center text-xl">Sign In</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-5" >
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{ required: "email is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {form.formState.errors.email && <FormMessage>{form.formState.errors.email.message}</FormMessage>}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: "Password is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}