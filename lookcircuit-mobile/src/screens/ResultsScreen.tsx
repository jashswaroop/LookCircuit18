import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { X, Share2, Heart, Award } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

const { width } = Dimensions.get('window');

const ResultsScreen = ({ navigation, route }: any) => {
    // Mock results if none passed
    const results = route.params?.analysisResults || {
        skinTone: { type: 3, undertone: 'Warm', hex: '#D4A574' },
        faceShape: { shape: 'Oval', confidence: 0.92 },
        season: 'Spring',
    };

    const imageUri = route.params?.imageUri || 'https://via.placeholder.com/300';

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.background.secondary, colors.background.primary]}
                style={StyleSheet.absoluteFillObject}
            />

            <SafeAreaView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <X size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Analysis Verification</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Share2 size={20} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Hero Section */}
                    <Animated.View entering={FadeInDown} style={styles.heroSection}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageUri }} style={styles.userImage} />
                            <View style={styles.seasonBadge}>
                                <Text style={styles.seasonText}>{results.season}</Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Bento Grid Results */}
                    <Text style={styles.sectionTitle}>Detected Attributes</Text>

                    <View style={styles.bentoGrid}>
                        {/* Skin Tone Card */}
                        <Animated.View entering={FadeInDown.delay(200)} style={[styles.bentoCard, styles.cardLarge]}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                                style={styles.cardGradient}
                            >
                                <View style={styles.cardIconBox}>
                                    <View style={[styles.colorDot, { backgroundColor: results.skinTone.hex }]} />
                                </View>
                                <View>
                                    <Text style={styles.cardLabel}>Skin Tone</Text>
                                    <Text style={styles.cardValue}>Type {results.skinTone.type}</Text>
                                    <Text style={styles.cardSub}>{results.skinTone.undertone} Undertone</Text>
                                </View>
                            </LinearGradient>
                        </Animated.View>

                        {/* Face Shape Card */}
                        <Animated.View entering={FadeInRight.delay(300)} style={[styles.bentoCard, styles.cardHalf]}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                                style={styles.cardGradient}
                            >
                                <Award size={24} color={colors.accent.cyan} style={{ marginBottom: 12 }} />
                                <Text style={styles.cardLabel}>Face Shape</Text>
                                <Text style={styles.cardValue}>{results.faceShape.shape}</Text>
                            </LinearGradient>
                        </Animated.View>

                        {/* Match Score */}
                        <Animated.View entering={FadeInRight.delay(400)} style={[styles.bentoCard, styles.cardHalf]}>
                            <LinearGradient
                                colors={[colors.accent.primary, colors.accent.secondary]}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Heart size={24} color="#fff" style={{ marginBottom: 12 }} />
                                <Text style={[styles.cardLabel, { color: 'rgba(255,255,255,0.8)' }]}>Style DNA</Text>
                                <Text style={styles.cardValue}>98%</Text>
                            </LinearGradient>
                        </Animated.View>
                    </View>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Discover')}
                    >
                        <Text style={styles.actionButtonText}>View Recommendations</Text>
                    </TouchableOpacity>

                </ScrollView>
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
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: {
        fontFamily: typography.fonts.h3,
        fontSize: 16,
        color: colors.text.primary,
        letterSpacing: 1,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    heroSection: {
        alignItems: 'center',
        marginVertical: 24,
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        padding: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        position: 'relative',
    },
    userImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    seasonBadge: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: colors.accent.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.background.primary,
    },
    seasonText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    sectionTitle: {
        fontFamily: typography.fonts.h3,
        fontSize: 18,
        color: colors.text.primary,
        marginBottom: 16,
    },
    bentoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 32,
    },
    bentoCard: {
        borderRadius: layout.borderRadius.xl,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    cardLarge: {
        width: '100%',
        height: 140,
    },
    cardHalf: {
        width: (width - 48 - 16) / 2, // Width - pad - gap / 2
        height: 140,
    },
    cardIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 12,
    },
    colorDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    cardLabel: {
        color: colors.text.secondary,
        fontSize: 12,
        fontFamily: typography.fonts.body,
        marginBottom: 4,
    },
    cardValue: {
        color: colors.text.primary,
        fontSize: 18,
        fontFamily: typography.fonts.h3,
    },
    cardSub: {
        color: colors.text.muted,
        fontSize: 12,
        marginTop: 4,
    },
    actionButton: {
        backgroundColor: colors.accent.primary,
        paddingVertical: 18,
        borderRadius: layout.borderRadius.xl,
        alignItems: 'center',
        marginTop: 16,
    },
    actionButtonText: {
        color: '#fff',
        fontFamily: typography.fonts.h3,
        fontSize: 16,
    },
});

export default ResultsScreen;
