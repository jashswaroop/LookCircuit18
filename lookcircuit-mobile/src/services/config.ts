/**
 * API Configuration
 * Central configuration for backend API connectivity
 */

// Base URL for the FastAPI backend
// In development, this points to localhost
// In production, this should be the deployed API URL
export const API_CONFIG = {
    // Base URL - change this when deploying
    BASE_URL: __DEV__ ? 'http://localhost:8000' : 'https://api.lookcircuit.com',

    // API version prefix
    API_VERSION: '/api/v1',

    // Endpoints
    ENDPOINTS: {
        // Health checks
        HEALTH: '/health',

        // Analysis
        ANALYSIS_FACE: '/analysis/face',
        ANALYSIS_HEALTH: '/analysis/health',

        // Recommendations
        RECOMMENDATIONS_GENERATE: '/recommendations/generate',
        RECOMMENDATIONS_OCCASION: '/recommendations/occasion',
        RECOMMENDATIONS_OCCASIONS_LIST: '/recommendations/occasions',
        RECOMMENDATIONS_HEALTH: '/recommendations/health',

        // Products
        PRODUCTS_DISCOVER: '/products/discover',
        PRODUCTS_CATEGORIES: '/products/categories',
        PRODUCTS_HEALTH: '/products/health',

        // Users
        USERS_ME: '/users/me',
        USERS_PROFILE: '/users/profile',
    },

    // Request timeout in milliseconds
    TIMEOUT: 30000,

    // Retry configuration
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
};

// Helper to build full URL
export const buildUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
};

// Supabase configuration
export const SUPABASE_CONFIG = {
    URL: 'https://xxpgvvkkakltjgpsjhxj.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4cGd2dmtrYWtsdGpncHNqaHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MjAzMzcsImV4cCI6MjA4MzI5NjMzN30.BHxeLoOrL_6SZUsS0FZ5M0bRfI8x1_QeD2BtmWPzwfg',
};
