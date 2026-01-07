import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { colors, typography } from '../theme';

const RecommendationsScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.background.primary, '#1E1B4B']} style={StyleSheet.absoluteFillObject} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.centerContent}>
                    <View style={styles.iconBox}>
                        <Sparkles size={40} color={colors.accent.gold} />
                    </View>
                    <Text style={styles.title}>Style Guide</Text>
                    <Text style={styles.placeholderText}>
                        Personalized fashion recommendations based on your analysis will appear here.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    safeArea: { flex: 1 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: { fontSize: 32, fontFamily: typography.fonts.h1, color: '#fff', marginBottom: 12 },
    placeholderText: {
        color: colors.text.muted,
        fontFamily: typography.fonts.body,
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 16
    }
});
export default RecommendationsScreen;
