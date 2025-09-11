import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFetchTransactionData } from "@/hooks/useFetchTransactionData"

export function Dashboard() {

    const [itemCount, setItemCount] = useState(5)

    const { data, currentPage, setCurrentPage, isError, isLoading, error, reset } = useFetchTransactionData(itemCount)

    if (isLoading) return <>Loading...</>

    if (isError) {
        console.log(error)
        return (<div>An Error Occured!</div>)
    }
    return (
        <div>
            <Select onValueChange={(e) => {
                reset()
                setItemCount(Number(e))
            }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Items per Page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5" >5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                </SelectContent>
            </Select>
            <div className='flex flex-row gap-5 items-center justify-end '>
                <Button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
                <p>{currentPage}</p>
                <Button disabled={!(currentPage < data.length)} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
            </div>
        </div>
    )
}