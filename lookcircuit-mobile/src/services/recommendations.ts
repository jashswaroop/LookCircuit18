/**
 * Recommendations Service
 * Provides personalized style and color recommendations
 */

import { API_CONFIG } from './config';
import { apiPost, apiGet, ApiResponse } from './api';
import { AnalysisResult } from './analysis';

// Color palette types
export interface ColorPalette {
    season: string; // 'spring' | 'summer' | 'autumn' | 'winter'
    best_colors: string[];
    neutral_colors: string[];
    avoid_colors: string[];
}

// Style recommendation types
export interface StyleRecommendations {
    necklines: string[];
    patterns: string[];
    fits: string[];
    fabrics: string[];
}

// Grooming recommendation types
export interface GroomingRecommendations {
    hairstyles: string[];
    beard_styles?: string[];
    tips: string[];
}

// Full recommendations response
export interface RecommendationsResult {
    color_palette: ColorPalette;
    style: StyleRecommendations;
    grooming: GroomingRecommendations;
    reasoning: string;
}

export interface RecommendationsResponse {
    success: boolean;
    recommendations: RecommendationsResult;
}

// Occasion outfit types
export interface OccasionOutfit {
    occasion: string;
    top: string;
    bottom: string;
    footwear: string;
    accessories: string[];
    grooming_notes: string;
    color_suggestions: string[];
}

export interface OccasionResponse {
    success: boolean;
    outfit: OccasionOutfit;
}

/**
 * Generate personalized recommendations based on analysis results
 */
export const generateRecommendations = async (
    analysisResult: AnalysisResult,
    gender: string = 'male',
    bodyType: string = 'mesomorph'
): Promise<ApiResponse<RecommendationsResult>> => {
    try {
        const requestBody = {
            fitzpatrick_type: analysisResult.skin_tone.fitzpatrick_type,
            undertone: analysisResult.skin_tone.undertone,
            face_shape: analysisResult.face_shape.shape,
            body_type: bodyType,
            hair_coverage: analysisResult.hair_coverage.level,
            gender: gender,
        };

        const response = await apiPost<RecommendationsResponse>(
            API_CONFIG.ENDPOINTS.RECOMMENDATIONS_GENERATE,
            requestBody
        );

        if (response.success && response.data) {
            return {
                success: true,
                data: response.data.recommendations,
            };
        }

        return { success: false, error: response.error || 'Failed to generate recommendations' };

    } catch (error) {
        console.error('Recommendations error:', error);
        return { success: false, error: 'Failed to generate recommendations. Please try again.' };
    }
};

/**
 * Get outfit recommendations for a specific occasion
 */
export const getOccasionOutfit = async (
    occasion: string,
    gender: string = 'male'
): Promise<ApiResponse<OccasionOutfit>> => {
    try {
        const response = await apiGet<OccasionResponse>(
            `${API_CONFIG.ENDPOINTS.RECOMMENDATIONS_OCCASION}/${occasion}?gender=${gender}`
        );

        if (response.success && response.data) {
            return {
                success: true,
                data: response.data.outfit,
            };
        }

        return { success: false, error: response.error || 'Failed to get occasion outfit' };

    } catch (error) {
        console.error('Occasion outfit error:', error);
        return { success: false, error: 'Failed to get outfit recommendations.' };
    }
};

/**
 * List all available occasions
 */
export const listOccasions = async (): Promise<string[]> => {
    try {
        const response = await apiGet<{ occasions: string[] }>(
            API_CONFIG.ENDPOINTS.RECOMMENDATIONS_OCCASIONS_LIST
        );

        if (response.success && response.data) {
            return response.data.occasions;
        }

        return [];
    } catch {
        return [];
    }
};
