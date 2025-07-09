export async function login(username, password) {
    const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    const data = await res.json();
    localStorage.setItem('accessToken', data.token);
}

// Get token
export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

// Check token validity
export function isTokenValid() {
    const token = getAccessToken();
    if (!token) return false;
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
}

// Central fetch wrapper
const BASE_URL = 'http://localhost:8080/api';

async function handleResponse(res) {
    const contentType = res.headers.get('Content-Type');

    if (!res.ok) {
        const errorText = contentType && contentType.includes('application/json')
            ? (await res.json()).message || JSON.stringify(await res.json())
            : await res.text();

        throw new Error(`API ${res.status}: ${errorText}`);
    }

    return contentType && contentType.includes('application/json')
        ? res.json()
        : null;
}

export const api = {
    get: async (path) => {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: 'include'
        });
        return handleResponse(res);
    },

    post: async (path, body) => {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });
        return handleResponse(res);
    },

    put: async (path, body) => {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });
        return handleResponse(res);
    },

    delete: async (path) => {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: 'include'
        });
        return handleResponse(res);
    }
};