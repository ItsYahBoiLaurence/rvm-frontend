import api from "@/axiosApi"
import type { ApiData } from "@/types/api"
import { useQuery } from "@tanstack/react-query"

export function useFetchApiList() {
    const { data: rawData, isError, isLoading } = useQuery<ApiData[]>({
        queryKey: ['api-list'],
        queryFn: async () => {
            const res = await api.get('/api-key-management/getApiList')
            return res.data
        }
    })

    const data = rawData ?? [] as ApiData[]

    return { data, isError, isLoading }
}