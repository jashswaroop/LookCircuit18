/**
 * Core API Client
 * Handles all HTTP requests with auth token injection and error handling
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, buildUrl } from './config';

// Storage key for auth token
const AUTH_TOKEN_KEY = '@lookcircuit_auth_token';

// Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface ApiError {
    status: number;
    message: string;
    detail?: string;
}

// Get stored auth token
export const getAuthToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
        return null;
    }
};

// Store auth token
export const setAuthToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Remove auth token
export const clearAuthToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};

// Build headers with auth
const buildHeaders = async (contentType?: string): Promise<HeadersInit> => {
    const token = await getAuthToken();
    const headers: HeadersInit = {
        'Accept': 'application/json',
    };

    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// Generic fetch wrapper with timeout
const fetchWithTimeout = async (
    url: string,
    options: RequestInit,
    timeout: number = API_CONFIG.TIMEOUT
): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

// Handle API response
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.detail || response.statusText,
            detail: errorData.detail,
        } as ApiError;
    }

    const data = await response.json();
    return {
        success: true,
        data: data as T,
    };
};

/**
 * GET request
 */
export const apiGet = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const url = buildUrl(endpoint);
    const headers = await buildHeaders('application/json');

    try {
        const response = await fetchWithTimeout(url, {
            method: 'GET',
            headers,
        });
        return handleResponse<T>(response);
    } catch (error) {
        if ((error as ApiError).status) {
            return { success: false, error: (error as ApiError).message };
        }
        return { success: false, error: 'Network error. Please check your connection.' };
    }
};

/**
 * POST request with JSON body
 */
export const apiPost = async <T>(endpoint: string, body: object): Promise<ApiResponse<T>> => {
    const url = buildUrl(endpoint);
    const headers = await buildHeaders('application/json');

    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    } catch (error) {
        if ((error as ApiError).status) {
            return { success: false, error: (error as ApiError).message };
        }
        return { success: false, error: 'Network error. Please check your connection.' };
    }
};

/**
 * POST request with FormData (for file uploads)
 */
export const apiPostFormData = async <T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> => {
    const url = buildUrl(endpoint);
    const token = await getAuthToken();

    const headers: HeadersInit = {
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    // Note: Don't set Content-Type for FormData - browser sets it with boundary

    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers,
            body: formData,
        });
        return handleResponse<T>(response);
    } catch (error) {
        if ((error as ApiError).status) {
            return { success: false, error: (error as ApiError).message };
        }
        return { success: false, error: 'Network error. Please check your connection.' };
    }
};

/**
 * Health check
 */
export const checkHealth = async (): Promise<boolean> => {
    try {
        const response = await apiGet<{ status: string }>('/health');
        return response.success && response.data?.status === 'ok';
    } catch {
        return false;
    }
};
