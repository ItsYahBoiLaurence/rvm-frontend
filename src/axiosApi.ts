import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        const apiKey = import.meta.env.VITE_API_KEY
        if (token && apiKey) {
            config.headers.Authorization = `Bearer ${token}`
            config.headers['x-api-key'] = apiKey

        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api