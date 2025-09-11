import type { RVMData } from "@/types/data";
import { useQuery } from "@tanstack/react-query";

// function chunk<T>(array: T[], size: number): T[][] {
//     if (!array.length) return []
//     const head = array.slice(0, size)
//     const tail = array.slice(size)
//     return [head, ...chunk(tail, size)]
// }

export function useFetchTransactionData(/**size: number = 5**/) {

    const { data: rawData, isError, isLoading, error } = useQuery<RVMData[]>({
        queryKey: ['table-data'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/data/getAll')
            const data = await response.json()
            return data
        },
    })

    const data = rawData ?? []

    return { data, isError, isLoading, error }

}