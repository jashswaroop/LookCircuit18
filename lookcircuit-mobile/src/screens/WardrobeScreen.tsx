import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Grid, List as ListIcon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, typography, layout } from '../theme';

const { width } = Dimensions.get('window');

const WARDROBE_ITEMS = [
    { id: 1, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80', label: 'White Shirt' },
    { id: 2, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80', label: 'Graphic Tee' },
    { id: 3, image: 'https://images.unsplash.com/photo-1551028919-ac6635f0ed16?w=500&q=80', label: 'Jacket' },
    { id: 4, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', label: 'Sneakers' },
    { id: 5, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&q=80', label: 'Blue Shirt' },
];

const WardrobeScreen = () => {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.background.primary, '#1E1B4B']} style={StyleSheet.absoluteFillObject} />
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Wardrobe</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Plus size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    {['All', 'Tops', 'Bottoms', 'Shoes'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                    {WARDROBE_ITEMS.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInDown.delay(index * 100)}
                            style={styles.card}
                        >
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.cardLabel}>
                                <Text style={styles.itemText}>{item.label}</Text>
                            </View>
                        </Animated.View>
                    ))}

                    {/* Add New Placeholder */}
                    <TouchableOpacity style={[styles.card, styles.addCard]}>
                        <Plus size={32} color={colors.text.muted} />
                        <Text style={styles.addText}>Add Item</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16
    },
    title: { fontSize: 32, fontFamily: typography.fonts.h1, color: '#fff' },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.accent.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.accent.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    tabs: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 24 },
    tab: { marginRight: 20, paddingVertical: 8 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: colors.accent.cyan },
    tabText: { color: colors.text.muted, fontSize: 16, fontFamily: typography.fonts.body },
    activeTabText: { color: '#fff', fontSize: 16, fontFamily: typography.fonts.h3 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 24, gap: 16, paddingBottom: 100 },
    card: {
        width: (width - 48 - 16) / 2,
        height: (width - 48 - 16) / 2 * 1.3,
        borderRadius: 20,
        backgroundColor: colors.background.surface,
        overflow: 'hidden',
        position: 'relative',
    },
    image: { width: '100%', height: '100%' },
    cardLabel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
    itemText: { color: '#fff', fontSize: 12, fontFamily: typography.fonts.h3 },
    addCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addText: { color: colors.text.muted, fontFamily: typography.fonts.body },
});
export default WardrobeScreen;
