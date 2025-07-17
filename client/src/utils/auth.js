// src/utils/auth.js
const TOKEN_KEY = 'token';
const ROLE_KEY = 'userRole';
const USERNAME_KEY = 'username';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Check if localStorage is available
const isLocalStorageAvailable = () => {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
};

/**
 * Retrieve the JWT token from localStorage.
 */
export function getToken() {
    if (!isLocalStorageAvailable()) return null;
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
    }
}

/**
 * Save the JWT token, role, and username to localStorage.
 * @param {string} token - JWT token string.
 * @param {string} role - User role.
 * @param {string} username - User username.
 */
export function setToken(token, role, username) {
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }
    try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(ROLE_KEY, role);
        localStorage.setItem(USERNAME_KEY, username);
        return true;
    } catch (error) {
        console.error('Error setting token in localStorage:', error);
        return false;
    }
}

/**
 * Remove the JWT token, role, and username from localStorage.
 */
export function removeToken() {
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
        localStorage.removeItem(USERNAME_KEY);
        return true;
    } catch (error) {
        console.error('Error removing token from localStorage:', error);
        return false;
    }
}

/**
 * Get current user role from localStorage.
 * @returns {string|null}
 */
export function getRole() {
    if (!isLocalStorageAvailable()) return null;
    try {
        return localStorage.getItem(ROLE_KEY);
    } catch (error) {
        console.error('Error getting role from localStorage:', error);
        return null;
    }
}

/**
 * Get current username from localStorage.
 * @returns {string|null}
 */
export function getUsername() {
    if (!isLocalStorageAvailable()) return null;
    try {
        return localStorage.getItem(USERNAME_KEY);
    } catch (error) {
        console.error('Error getting username from localStorage:', error);
        return null;
    }
}

/**
 * Check if the JWT token exists.
 * @returns {boolean} True if token exists (simplified validation).
 */
export function isTokenValid() {
    const token = getToken();
    return !!token; // Simplified; add jwtDecode for expiration if needed
}

/**
 * Check if user is logged in (token exists).
 * @returns {boolean}
 */
export function isLoggedIn() {
    const token = getToken();
    return !!token && isTokenValid();
}

/**
 * Perform a fetch request with optional authorization header.
 * Prepends API_BASE_URL if `url` is relative.
 * @param {string} url
 * @param {object} options
 * @param {boolean} requiresAuth
 * @returns {Promise<any>} Parsed JSON response.
 */
export async function apiFetch(url, options = {}, requiresAuth = false) {
    const headers = options.headers ? { ...options.headers } : {};
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    if (requiresAuth) {
        const token = getToken();
        if (!token) {
            throw new Error('No authentication token available');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(fullUrl, { ...options, headers });

        if (response.status === 401 && requiresAuth) {
            removeToken();
            throw new Error('Authentication expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error. Please check your connection.');
        }
        throw error;
    }
}

// Convenience methods for HTTP requests
apiFetch.get = (url, options = {}) => apiFetch(url, { ...options, method: 'GET' }, true);
apiFetch.post = (url, data, options = {}) => apiFetch(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options.headers }
}, true);
apiFetch.put = (url, data, options = {}) => apiFetch(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options.headers }
}, true);
apiFetch.delete = (url, options = {}) => apiFetch(url, { ...options, method: 'DELETE' }, true);

/**
 * Log in by saving the access token, role, and username.
 * @param {string} accessToken
 * @param {string} role
 * @param {string} username
 */
export function login(accessToken, role, username) {
    if (!accessToken) {
        throw new Error('Access token is required');
    }
    const success = setToken(accessToken, role, username);
    if (!success) {
        throw new Error('Failed to save authentication token');
    }
}

/**
 * Log out by clearing the access token, role, and username.
 */
export function logout() {
    removeToken();
}

const authModule = {
    getToken,
    setToken,
    removeToken,
    getRole,
    getUsername,
    isTokenValid,
    isLoggedIn,
    apiFetch,
    login,
    logout,
};

export default authModule;