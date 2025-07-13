const TOKEN_KEY = 'ft_accessToken';

/**
 * Retrieve access token from localStorage.
 * @returns {string|null}
 */
export function getAccessToken() {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (err) {
        console.error('[Auth] Unable to access localStorage:', err);
        return null;
    }
}

/**
 * Store access token in localStorage.
 * @param {string} token
 */
export function setAccessToken(token) {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch (err) {
        console.error('[Auth] Unable to set accessToken:', err);
    }
}

/**
 * Remove access token from localStorage.
 */
export function removeAccessToken() {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
        console.error('[Auth] Unable to remove accessToken:', err);
    }
}

/**
 * Optional: Decode JWT to get expiry (requires JWT in standard format)
 * @returns {number|null} expiry timestamp in seconds, or null if invalid
 */
export function getTokenExpiry() {
    const token = getAccessToken();
    if (!token) return null;
    try {
        const [, payload] = token.split('.');
        if (!payload) return null;
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded.exp || null;
    } catch (err) {
        console.error('[Auth] Error decoding token expiry:', err);
        return null;
    }
}

/**
 * Optional: Check if token is expired
 * @returns {boolean}
 */
export function isTokenExpired() {
    const exp = getTokenExpiry();
    if (!exp) return true;
    return Date.now() / 1000 >= exp;
}

/**
 * Check if token exists and is valid (not expired)
 * @returns {boolean}
 */
export function isTokenValid() {
    const token = getAccessToken();
    if (!token) return false;
    return !isTokenExpired();
}

/**
 * API base URL - adjust this to match your backend
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Create API instance with authentication headers (for admin functions)
 */
export const api = {
    async get(endpoint) {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async post(endpoint, data) {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async put(endpoint, data) {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async delete(endpoint) {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    }
};

/**
 * Public API instance without authentication headers (for public endpoints)
 */
export const publicApi = {
    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    },

    async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    }
};



/**
 * Login function
 * @param {string} username
 * @param {string} password
 * @returns {Promise<void>}
 */
export async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Login failed' }));
            throw new Error(error.message || 'Invalid credentials');
        }

        const data = await response.json();

        if (data.token) {
            setAccessToken(data.token);
        } else {
            throw new Error('No token received from server');
        }
    } catch (error) {
        console.error('[Auth] Login error:', error);
        throw error;
    }
}

/**
 * Logout function
 * @returns {void}
 */
export function logout() {
    removeAccessToken();
}