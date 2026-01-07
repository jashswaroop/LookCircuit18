// LookCircuit Design System 2.0 - Premium Layout & Shadows

export const layout = {
    borderRadius: {
        small: 12,
        medium: 16,
        large: 24,
        xl: 32,
        xxl: 40, // Super rounded for finance feel
        round: 9999,
    },

    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
        xxxl: 64,
    },

    // "Premium Glow" Shadows
    shadows: {
        soft: {
            shadowColor: '#6366F1',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 5,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 10,
        },
        strong: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.4,
            shadowRadius: 40,
            elevation: 20,
        },
        glow: (color: string) => ({
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 10,
        }),
        glassBorder: {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
        }
    }
};
