import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Bell, ArrowUpRight, Sparkles, Shirt, TrendingUp } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    // Mock Data for "Style Score" Chart
    // Values relative to 100 max
    const scoreHistory = [40, 55, 60, 58, 70, 78, 85];
    const currentScore = 85;

    return (
        <View style={styles.container}>
            {/* Light Mode Background: Clean White/Slate Mixture */}
            <LinearGradient
                colors={['#FFFFFF', '#F8FAFC', '#F1F5F9']}
                locations={[0, 0.7, 1]}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Removed ambient glows for cleaner look */}

            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <Animated.View entering={FadeInDown} style={styles.header}>
                        <View>
                            <Text style={styles.greeting}>Good Evening,</Text>
                            <Text style={styles.username}>John Doe</Text>
                        </View>
                        <TouchableOpacity style={styles.iconButton}>
                            <Bell size={24} color={colors.text.primary} />
                            {/* <View style={styles.badge} /> */}
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Improved Style Score Card */}
                    <Animated.View entering={FadeInDown.delay(200)} style={styles.scoreCardContainer}>
                        <LinearGradient
                            colors={['#4F46E5', '#7C3AED']} // Indigo to Violet
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.scoreCard}
                        >
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.cardLabel}>Style Score</Text>
                                    <Text style={styles.scoreValue}>{currentScore}</Text>
                                </View>
                                <View style={styles.trendBadge}>
                                    <TrendingUp size={16} color="#fff" />
                                    <Text style={styles.trendText}>+12%</Text>
                                </View>
                            </View>

                            {/* Chart Area */}
                            <View style={styles.chartArea}>
                                {scoreHistory.map((val, i) => (
                                    <View key={i} style={styles.barContainer}>
                                        <View
                                            style={[
                                                styles.chartBar,
                                                {
                                                    height: `${val}%`,
                                                    opacity: i === scoreHistory.length - 1 ? 1 : 0.4
                                                }
                                            ]}
                                        />
                                    </View>
                                ))}
                                {/* Overlay/Line indicator could go here */}
                            </View>

                            {/* Footer Text correctly positioned below chart */}
                            <Text style={styles.cardNumber}>AI Powered Analysis</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Quick Action Grid */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Analyze')}>
                            <LinearGradient
                                colors={['rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.05)']}
                                style={styles.iconBox}
                            >
                                <Sparkles size={28} color={colors.accent.primary} />
                            </LinearGradient>
                            <Text style={styles.gridLabel}>New Scan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Wardrobe')}>
                            <LinearGradient
                                colors={['rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.05)']}
                                style={styles.iconBox}
                            >
                                <Shirt size={28} color={colors.accent.secondary} />
                            </LinearGradient>
                            <Text style={styles.gridLabel}>Add Item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Discover')}>
                            <LinearGradient
                                colors={['rgba(6, 182, 212, 0.2)', 'rgba(6, 182, 212, 0.05)']}
                                style={styles.iconBox}
                            >
                                <ArrowUpRight size={28} color={colors.accent.cyan} />
                            </LinearGradient>
                            <Text style={styles.gridLabel}>Trending</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recent Activity Section */}
                    <Text style={styles.sectionTitle}>Recent Analysis</Text>

                    <View style={styles.listContainer}>
                        {[1, 2, 3].map((item, index) => (
                            <Animated.View
                                key={item}
                                entering={FadeInUp.delay(300 + (index * 100))}
                                style={styles.listItem}
                            >
                                <BlurView intensity={Platform.OS === 'web' ? 0 : 30} tint="dark" style={styles.glassList}>
                                    <View style={[styles.listIcon, { backgroundColor: item === 1 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)' }]}>
                                        <Sparkles size={20} color={itemsColor(index)} />
                                    </View>
                                    <View style={styles.listContent}>
                                        <Text style={styles.listTitle}>{index === 0 ? 'Outfit Check' : index === 1 ? 'Style Scan' : 'Wardrobe Upload'}</Text>
                                        <Text style={styles.listSubtitle}>Today, 2:30 PM • 92% Match</Text>
                                    </View>
                                    <Text style={styles.listAmount}>+5 pts</Text>
                                </BlurView>
                            </Animated.View>
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const itemsColor = (i: number) => {
    if (i === 0) return colors.accent.purple;
    if (i === 1) return colors.accent.cyan;
    return colors.text.secondary;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120, // Space for navbar
        paddingTop: Platform.OS === 'android' ? 40 : 10,
    },
    ambientGlowTop: {
        position: 'absolute',
        top: -150,
        right: -50,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(6, 182, 212, 0.1)', // Cyan glow
        transform: [{ scaleX: 1.5 }],
    },
    ambientGlowBottom: {
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: 'rgba(99, 102, 241, 0.08)', // Indigo glow
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    greeting: {
        fontFamily: typography.fonts.body,
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 2,
    },
    username: {
        fontFamily: typography.fonts.h1,
        fontSize: 28,
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    // Style Score Card Refined
    scoreCardContainer: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    scoreCard: {
        height: 220, // Increased height for better proportions
        borderRadius: 32,
        padding: 24,
        position: 'relative',
        shadowColor: colors.accent.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 12,
        justifyContent: 'space-between', // Push chart to middle/bottom
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontFamily: typography.fonts.body,
        fontSize: 14,
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 56,
        fontFamily: typography.fonts.h1, // Display font
        color: '#fff',
        lineHeight: 60,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    trendText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: typography.fonts.h3,
        fontWeight: '600',
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: 24, // Space for footer text
        paddingHorizontal: 0,
    },
    barContainer: {
        width: '12%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    chartBar: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 6,
        minHeight: 10,
    },
    cardNumber: {
        // Renamed to Footer Text functionally
        position: 'absolute',
        bottom: 24,
        left: 24,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: typography.fonts.body,
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },

    // Grid
    sectionTitle: {
        paddingHorizontal: 24,
        fontFamily: typography.fonts.h3,
        fontSize: 18,
        color: colors.text.primary,
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 40,
    },
    gridItem: {
        flex: 1,
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 72,
        height: 72,
        borderRadius: 28, // Squircler
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    gridLabel: {
        color: colors.text.secondary,
        fontFamily: typography.fonts.body,
        fontSize: 13,
    },

    // List
    listContainer: {
        paddingHorizontal: 24,
        gap: 16,
    },
    listItem: {
        // borderRadius: layout.borderRadius.large,
        // overflow: 'hidden',
    },
    glassList: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingVertical: 20,
        borderRadius: 24,
        gap: 16,
        backgroundColor: 'rgba(30, 41, 59, 0.6)', // Fallback / Web
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    listIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        flex: 1,
    },
    listTitle: {
        fontFamily: typography.fonts.h3,
        color: colors.text.primary,
        fontSize: 16,
        marginBottom: 4,
    },
    listSubtitle: {
        fontFamily: typography.fonts.body,
        color: colors.text.muted,
        fontSize: 12,
    },
    listAmount: {
        fontFamily: typography.fonts.h3,
        color: colors.success,
        fontSize: 16,
    },
});

export default HomeScreen;
