/**
 * Authentication Service
 * Handles user authentication with Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';
import { setAuthToken, clearAuthToken } from './api';

// Initialize Supabase client
const supabase = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

// Auth response types
export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    created_at?: string;
}

export interface AuthResult {
    success: boolean;
    user?: AuthUser;
    error?: string;
}

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        if (data.session?.access_token) {
            await setAuthToken(data.session.access_token);
        }

        return {
            success: true,
            user: {
                id: data.user?.id || '',
                email: data.user?.email || '',
                name: data.user?.user_metadata?.name,
            },
        };
    } catch (error) {
        return { success: false, error: 'Authentication failed. Please try again.' };
    }
};

/**
 * Sign up with email and password
 */
export const signUp = async (email: string, password: string, name?: string): Promise<AuthResult> => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });

        if (error) {
            return { success: false, error: error.message };
        }

        if (data.session?.access_token) {
            await setAuthToken(data.session.access_token);
        }

        return {
            success: true,
            user: {
                id: data.user?.id || '',
                email: data.user?.email || '',
                name: name,
            },
        };
    } catch (error) {
        return { success: false, error: 'Registration failed. Please try again.' };
    }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    await clearAuthToken();
};

/**
 * Get current user session
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name,
        created_at: user.created_at,
    };
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
};

/**
 * Refresh session token
 */
export const refreshSession = async (): Promise<boolean> => {
    const { data, error } = await supabase.auth.refreshSession();

    if (error || !data.session) {
        return false;
    }

    await setAuthToken(data.session.access_token);
    return true;
};
