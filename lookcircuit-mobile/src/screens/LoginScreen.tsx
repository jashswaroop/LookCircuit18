import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Mail, Lock, ArrowRight, User } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';
import { signIn, signUp } from '../services';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = async () => {
        // Validate inputs
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        if (isSignUp && !name.trim()) {
            Alert.alert('Error', 'Please enter your name.');
            return;
        }

        setIsLoading(true);

        try {
            const result = isSignUp
                ? await signUp(email.trim(), password, name.trim())
                : await signIn(email.trim(), password);

            if (result.success) {
                navigation.replace('Main');
            } else {
                Alert.alert('Authentication Failed', result.error || 'Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Background */}
            <LinearGradient
                colors={[colors.background.primary, '#1E1B4B', '#000000']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Ambient Glows */}
            <View style={[styles.glowBlob, { top: -100, left: -50, backgroundColor: colors.accent.cyan }]} />
            <View style={[styles.glowBlob, { bottom: -100, right: -50, backgroundColor: colors.accent.purple }]} />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.content}>

                        {/* Header */}
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
                            <View style={styles.logoBadge}>
                                <Text style={styles.logoText}>LC</Text>
                            </View>
                            <Text style={styles.welcomeText}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
                            <Text style={styles.subtitleText}>
                                {isSignUp ? 'Join the future of fashion analysis.' : 'Sign in to continue your style journey.'}
                            </Text>
                        </Animated.View>

                        {/* Form Card */}
                        <Animated.View entering={FadeInUp.delay(400)} style={styles.formContainer}>
                            <BlurView intensity={30} tint="dark" style={styles.glassCard}>

                                {/* Name Input (Sign Up Only) */}
                                {isSignUp && (
                                    <Animated.View entering={FadeInDown} style={styles.inputGroup}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <View style={styles.inputWrapper}>
                                            <User size={20} color={colors.text.muted} style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="John Doe"
                                                placeholderTextColor="rgba(255,255,255,0.3)"
                                                value={name}
                                                onChangeText={setName}
                                            />
                                        </View>
                                    </Animated.View>
                                )}

                                {/* Email Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.inputWrapper}>
                                        <Mail size={20} color={colors.text.muted} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="hello@example.com"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Lock size={20} color={colors.text.muted} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="••••••••"
                                            placeholderTextColor="rgba(255,255,255,0.3)"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry
                                        />
                                    </View>
                                    {!isSignUp && (
                                        <TouchableOpacity style={styles.forgotPass}>
                                            <Text style={styles.forgotPassText}>Forgot Password?</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Primary Button */}
                                <TouchableOpacity
                                    onPress={handleAuth}
                                    style={styles.loginButton}
                                    disabled={isLoading}
                                >
                                    <LinearGradient
                                        colors={isLoading ? ['#6B7280', '#4B5563'] : [colors.accent.primary, colors.accent.gradient.end]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.gradientButton}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <>
                                                <Text style={styles.loginButtonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
                                                <ArrowRight size={20} color="#fff" />
                                            </>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </BlurView>
                        </Animated.View>

                        {/* Toggle Link */}
                        <Animated.View entering={FadeInUp.delay(500)} style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>
                                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            </Text>
                            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                                <Text style={styles.toggleLink}>
                                    {isSignUp ? 'Sign In' : 'Create Account'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Social Login */}
                        <Animated.View entering={FadeInUp.delay(600)} style={styles.socialSection}>
                            <Text style={styles.socialText}>Or continue with</Text>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialBtn}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>G</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>A</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    glowBlob: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.2,
        transform: [{ scale: 1.5 }],
    },
    header: {
        alignItems: 'center',
        marginBottom: 32, // Slightly reduced
    },
    logoBadge: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginBottom: 24,
    },
    logoText: {
        fontFamily: typography.fonts.h1,
        fontSize: 24,
        color: '#fff',
    },
    welcomeText: {
        fontFamily: typography.fonts.h1,
        fontSize: 32,
        color: '#fff',
        marginBottom: 8,
    },
    subtitleText: {
        fontFamily: typography.fonts.body,
        fontSize: 16,
        color: colors.text.muted,
        textAlign: 'center',
    },
    formContainer: {
        marginBottom: 24,
    },
    glassCard: {
        padding: 24,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(30, 41, 59, 0.4)', // Slightly darker glass
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontFamily: typography.fonts.h3,
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontFamily: typography.fonts.body,
        fontSize: 16,
    },
    forgotPass: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    forgotPassText: {
        color: colors.accent.cyan,
        fontFamily: typography.fonts.body,
        fontSize: 13,
    },
    loginButton: {
        marginTop: 12,
        height: 56,
        shadowColor: colors.accent.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    gradientButton: {
        flex: 1,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 16,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    toggleText: {
        color: colors.text.muted,
        fontFamily: typography.fonts.body,
        fontSize: 14,
    },
    toggleLink: {
        color: colors.accent.cyan,
        fontFamily: typography.fonts.h3,
        fontSize: 14,
        marginLeft: 4,
    },
    socialSection: {
        alignItems: 'center',
    },
    socialText: {
        color: colors.text.muted,
        fontFamily: typography.fonts.body,
        fontSize: 14,
        marginBottom: 24,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 20,
    },
    socialBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});

export default LoginScreen;
