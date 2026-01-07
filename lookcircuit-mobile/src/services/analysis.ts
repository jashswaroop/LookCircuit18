/**
 * Face Analysis Service
 * Handles AI-powered face and style analysis
 */

import { API_CONFIG } from './config';
import { apiPostFormData, ApiResponse } from './api';
import * as FileSystem from 'expo-file-system';

// Analysis result types
export interface SkinToneResult {
    fitzpatrick_type: number;
    undertone: string; // 'warm' | 'cool' | 'neutral'
    hex_color: string;
}

export interface FaceShapeResult {
    shape: string; // 'oval' | 'round' | 'square' | 'heart' | 'oblong' | 'diamond'
    confidence: number;
}

export interface HairCoverageResult {
    level: string; // 'full' | 'partial' | 'minimal' | 'bald'
    confidence: number;
}

export interface AnalysisResult {
    detected: boolean;
    skin_tone: SkinToneResult;
    face_shape: FaceShapeResult;
    hair_coverage: HairCoverageResult;
    color_season?: string;
    timestamp: string;
}

export interface AnalysisResponse {
    success: boolean;
    analysis: AnalysisResult;
}

/**
 * Analyze face from image URI
 * @param imageUri - Local URI of the captured image
 */
export const analyzeFace = async (imageUri: string): Promise<ApiResponse<AnalysisResult>> => {
    try {
        // Read the file and create FormData
        const fileInfo = await FileSystem.getInfoAsync(imageUri);

        if (!fileInfo.exists) {
            return { success: false, error: 'Image file not found' };
        }

        // Create form data with the image
        const formData = new FormData();

        // Get file extension
        const uriParts = imageUri.split('.');
        const fileExtension = uriParts[uriParts.length - 1];
        const fileName = `photo.${fileExtension}`;
        const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

        // Append file to form data
        formData.append('file', {
            uri: imageUri,
            name: fileName,
            type: mimeType,
        } as any);

        // Send to API
        const response = await apiPostFormData<AnalysisResponse>(
            API_CONFIG.ENDPOINTS.ANALYSIS_FACE,
            formData
        );

        if (response.success && response.data) {
            return {
                success: true,
                data: response.data.analysis,
            };
        }

        return { success: false, error: response.error || 'Analysis failed' };

    } catch (error) {
        console.error('Face analysis error:', error);
        return { success: false, error: 'Failed to analyze image. Please try again.' };
    }
};

/**
 * Check if analysis service is healthy
 */
export const checkAnalysisHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${API_CONFIG.ENDPOINTS.ANALYSIS_HEALTH}`
        );
        const data = await response.json();
        return data.status === 'ready';
    } catch {
        return false;
    }
};
