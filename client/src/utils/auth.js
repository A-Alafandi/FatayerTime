import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const API = 'http://localhost:8080' // Backend root URL (no /api here)

// ✅ Access token now persisted in localStorage (survives page reload)
const ACCESS_KEY = 'access'

export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY)
}

export function storeAccessToken(token) {
    localStorage.setItem(ACCESS_KEY, token)
}

export function clearTokens() {
    localStorage.removeItem(ACCESS_KEY)
}

export function isTokenValid() {
    const token = getAccessToken()
    if (!token) return false
    try {
        const { exp } = jwtDecode(token)
        return exp * 1000 > Date.now()
    } catch {
        return false
    }
}

// ✅ Axios instance
export const api = axios.create({
    baseURL: `${API}/api`,
    withCredentials: true
})

// ✅ Add token to requests if available
api.interceptors.request.use(async (config) => {
    const token = getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// ✅ Refresh on 401 + redirect fallback
api.interceptors.response.use(null, async (error) => {
    if (error.response?.status === 401) {
        try {
            // Try to refresh
            const res = await axios.post(`${API}/api/auth/refresh`, null, { withCredentials: true })
            const { token } = res.data
            storeAccessToken(token)

            // Retry the original request
            error.config.headers.Authorization = `Bearer ${token}`
            return api(error.config)
        } catch (_) {
            // If refresh fails, clear session and redirect
            clearTokens()
            window.location.href = '/admin-login'
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})

// ✅ Login
export async function login(username, password) {
    const res = await axios.post(
        `${API}/api/auth/login`,
        { username, password },
        { withCredentials: true }
    )

    if (res.data?.token) {
        storeAccessToken(res.data.token)
    }

    return res.data
}

// ✅ Logout
export async function logout() {
    try {
        await axios.post(`${API}/api/auth/logout`, null, { withCredentials: true })
    } finally {
        clearTokens()
        window.location.href = '/admin-login'
    }
}
