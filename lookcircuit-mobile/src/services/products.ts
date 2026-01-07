/**
 * Products Service
 * Provides product discovery and search functionality
 */

import { API_CONFIG } from './config';
import { apiPost, apiGet, ApiResponse } from './api';

// Product types
export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    currency: string;
    image_url: string;
    product_url: string;
    category: string;
    colors: string[];
    rating?: number;
    in_stock: boolean;
}

export interface ProductsByCategory {
    [category: string]: Product[];
}

export interface ProductsResponse {
    success: boolean;
    products: ProductsByCategory;
    total_count: number;
}

// Product search request
export interface ProductSearchRequest {
    color_palette: string[];
    categories: string[];
    occasion?: string;
    max_results?: number;
}

/**
 * Discover products matching user's style profile
 */
export const discoverProducts = async (
    colorPalette: string[],
    categories: string[],
    occasion?: string,
    maxResults: number = 20
): Promise<ApiResponse<ProductsByCategory>> => {
    try {
        const requestBody: ProductSearchRequest = {
            color_palette: colorPalette,
            categories: categories,
            occasion: occasion,
            max_results: maxResults,
        };

        const response = await apiPost<ProductsResponse>(
            API_CONFIG.ENDPOINTS.PRODUCTS_DISCOVER,
            requestBody
        );

        if (response.success && response.data) {
            return {
                success: true,
                data: response.data.products,
            };
        }

        return { success: false, error: response.error || 'Failed to discover products' };

    } catch (error) {
        console.error('Product discovery error:', error);
        return { success: false, error: 'Failed to load products. Please try again.' };
    }
};

/**
 * Get all available product categories
 */
export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await apiGet<{ categories: string[] }>(
            API_CONFIG.ENDPOINTS.PRODUCTS_CATEGORIES
        );

        if (response.success && response.data) {
            return response.data.categories;
        }

        return [];
    } catch {
        return [];
    }
};

/**
 * Check if product service is healthy
 */
export const checkProductsHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${API_CONFIG.ENDPOINTS.PRODUCTS_HEALTH}`
        );
        const data = await response.json();
        return data.status === 'ready';
    } catch {
        return false;
    }
};
