/**
 * Services Index
 * Re-exports all service modules for easy importing
 */

// API Configuration
export { API_CONFIG, SUPABASE_CONFIG, buildUrl } from './config';

// Core API Client
export {
    apiGet,
    apiPost,
    apiPostFormData,
    getAuthToken,
    setAuthToken,
    clearAuthToken,
    checkHealth,
    type ApiResponse,
    type ApiError,
} from './api';

// Authentication
export {
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    isAuthenticated,
    refreshSession,
    type AuthUser,
    type AuthResult,
} from './auth';

// Face Analysis
export {
    analyzeFace,
    checkAnalysisHealth,
    type AnalysisResult,
    type SkinToneResult,
    type FaceShapeResult,
    type HairCoverageResult,
} from './analysis';

// Recommendations
export {
    generateRecommendations,
    getOccasionOutfit,
    listOccasions,
    type RecommendationsResult,
    type ColorPalette,
    type StyleRecommendations,
    type GroomingRecommendations,
    type OccasionOutfit,
} from './recommendations';

// Products
export {
    discoverProducts,
    getCategories,
    checkProductsHealth,
    type Product,
    type ProductsByCategory,
    type ProductSearchRequest,
} from './products';
