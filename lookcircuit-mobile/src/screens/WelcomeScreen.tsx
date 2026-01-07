import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    FadeIn,
    FadeInDown,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Glasses, Watch, Shirt, Component, ArrowRight } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

const { width, height } = Dimensions.get('window');

// --- Floating Item Component ---
interface FloatingItemProps {
    icon: any;
    size: number;
    initialX: number;
    initialY: number;
    delay?: number;
    color?: string;
}

const FloatingItem = ({ icon: Icon, size, initialX, initialY, delay = 0, color }: FloatingItemProps) => {
    const translateY = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect(() => {
        // Floating animation (Bobbing up and down)
        translateY.value = withRepeat(
            withSequence(
                withTiming(-15, { duration: 2000 + delay, easing: Easing.inOut(Easing.quad) }),
                withTiming(15, { duration: 2500 + delay, easing: Easing.inOut(Easing.quad) })
            ),
            -1,
            true
        );

        // Subtle rotation
        rotate.value = withRepeat(
            withSequence(
                withTiming(5, { duration: 3000 + delay, easing: Easing.inOut(Easing.quad) }),
                withTiming(-5, { duration: 3000 + delay, easing: Easing.inOut(Easing.quad) })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
        ],
    }));

    return (
        <Animated.View
            style={[
                styles.floatingItemContainer,
                { left: initialX, top: initialY, width: size, height: size },
                animatedStyle,
            ]}
        >
            <BlurView intensity={30} tint="light" style={styles.glassCircle}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)']}
                    style={styles.gradientCircle}
                >
                    <Icon size={size * 0.5} color={color || '#fff'} />
                </LinearGradient>
            </BlurView>
        </Animated.View>
    );
};

// --- Welcome Screen ---
const WelcomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={[colors.background.primary, '#1E1B4B', '#000000']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Ambient Glows */}
            <View style={[styles.glowBlob, { top: -100, left: -50, backgroundColor: colors.accent.primary }]} />
            <View style={[styles.glowBlob, { top: height * 0.4, right: -100, backgroundColor: colors.accent.secondary }]} />
            <View style={[styles.glowBlob, { bottom: -100, left: width * 0.2, backgroundColor: colors.accent.cyan }]} />

            {/* Glass Overlay for Texture */}
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />

            <SafeAreaView style={styles.content}>

                {/* Header / Logo Area */}
                <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>LC</Text>
                    </View>
                    <Text style={styles.brandName}>LookCircuit</Text>
                </Animated.View>

                {/* Floating Animation Area */}
                <View style={styles.animationArea}>
                    {/* 
                User requested: Sunglasses, Wrist Watch, Dress (using Component/Shirt icon as proxy), Black Shirt.
                Positioned similarly to floating coins.
             */}
                    <FloatingItem
                        icon={Glasses}
                        size={80}
                        initialX={width * 0.1}
                        initialY={height * 0.15}
                        color={colors.accent.cyan}
                        delay={0}
                    />
                    <FloatingItem
                        icon={Shirt}
                        size={100}
                        initialX={width * 0.6}
                        initialY={height * 0.1}
                        color={colors.accent.purple}
                        delay={500}
                    />
                    <FloatingItem
                        icon={Watch}
                        size={70}
                        initialX={width * 0.75}
                        initialY={height * 0.25}
                        color={colors.accent.gold}
                        delay={1000}
                    />
                    <FloatingItem
                        icon={Component} // Proxy for Dress/Accessory
                        size={60}
                        initialX={width * 0.2}
                        initialY={height * 0.3}
                        color={colors.accent.secondary}
                        delay={200}
                    />
                </View>

                {/* Text & Actions */}
                <View style={styles.bottomSection}>
                    <Animated.Text entering={FadeInDown.delay(400)} style={styles.heroTitle}>
                        Optimize Your{'\n'}
                        <Text style={{ color: colors.accent.cyan }}>Style Potential</Text>
                    </Animated.Text>

                    <Animated.Text entering={FadeInDown.delay(600)} style={styles.heroSubtitle}>
                        AI-driven analysis to enhance your wardrobe score.
                        Discover fashion that pays dividends.
                    </Animated.Text>

                    <Animated.View entering={FadeInDown.delay(800)} style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <LinearGradient
                                colors={[colors.accent.primary, colors.accent.gradient.end]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.primaryButtonText}>Get Started</Text>
                                <ArrowRight size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.secondaryButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    glowBlob: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.3,
        transform: [{ scale: 1.5 }],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        gap: 12,
    },
    logoBadge: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    logoText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 18,
    },
    brandName: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 20,
        letterSpacing: 1,
    },
    animationArea: {
        flex: 1,
        position: 'relative',
        // marginTop: 20,
    },
    floatingItemContainer: {
        position: 'absolute',
        shadowColor: colors.accent.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    glassCircle: {
        flex: 1,
        borderRadius: layout.borderRadius.round,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    gradientCircle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        padding: 32,
        paddingBottom: 50,
    },
    heroTitle: {
        fontFamily: typography.fonts.h1,
        fontSize: 42,
        color: '#fff',
        lineHeight: 48,
        marginBottom: 16,
    },
    heroSubtitle: {
        fontFamily: typography.fonts.body,
        fontSize: 16,
        color: colors.text.secondary,
        lineHeight: 24,
        marginBottom: 40,
        maxWidth: '80%',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    primaryButton: {
        flex: 1,
        height: 56,
        borderRadius: layout.borderRadius.xxl,
        shadowColor: colors.accent.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    gradientButton: {
        flex: 1,
        borderRadius: layout.borderRadius.xxl,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    primaryButtonText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 16,
    },
    secondaryButton: {
        paddingHorizontal: 24,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: layout.borderRadius.xxl,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    secondaryButtonText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 16,
    },
});

export default WelcomeScreen;
