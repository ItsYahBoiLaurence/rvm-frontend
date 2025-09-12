export type ApiKeyListResponseType = {
    apiKey: string
}

export type ApiListResultType = {
    data: ApiKeyListResponseType[]
    isError: boolean
    isLoading: boolean
}