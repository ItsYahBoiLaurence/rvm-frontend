import api from "@/axiosApi"
import type { ApiKeyListResponseType, ApiListResultType } from "@/types/api"
import { useQuery } from "@tanstack/react-query"

export function useFetchApiList(): ApiListResultType {
    const { data: rawData, isError, isLoading } = useQuery<ApiKeyListResponseType[]>({
        queryKey: ['api-list'],
        queryFn: async () => {
            const res = await api.get('/api-key-management/getApiList')
            return res.data
        }
    })

    const data = rawData ?? [] as ApiKeyListResponseType[]

    return { data, isError, isLoading }
}