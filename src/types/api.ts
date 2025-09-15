export type ApiKeyListResponseType = {
    apiKey: string
}

export type ApiListResultType = {
    data: ApiKeyListResponseType[]
    isError: boolean
    isLoading: boolean
}

export type Role = "Admin" | "Viewer" | "Editor"

export type ApiData = {
    apiKey: string
    name: string
    description: string
    isActive: boolean
    dateCreated: Date
    companyOwner: string
    role: Role
    id: string
}