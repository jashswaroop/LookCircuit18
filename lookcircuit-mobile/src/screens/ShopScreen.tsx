import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, Filter, Star, Heart, RefreshCw } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, typography, layout } from '../theme';
import { discoverProducts, getCategories, type Product, type ProductsByCategory } from '../services';

const { width } = Dimensions.get('window');

// Fallback mock data in case API fails
const MOCK_PRODUCTS = [
    { id: '1', name: 'Silk Evening Gown', brand: 'Designer', price: 299, currency: 'USD', image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', product_url: '', category: 'formal', colors: [], rating: 4.8, in_stock: true },
    { id: '2', name: 'Structured Blazer', brand: 'Classic', price: 189, currency: 'USD', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', product_url: '', category: 'formal', colors: [], rating: 4.9, in_stock: true },
    { id: '3', name: 'Velvet Clutch', brand: 'Luxe', price: 85, currency: 'USD', image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', product_url: '', category: 'accessories', colors: [], rating: 4.7, in_stock: true },
    { id: '4', name: 'Classic Loafers', brand: 'Heritage', price: 150, currency: 'USD', image_url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80', product_url: '', category: 'shoes', colors: [], rating: 4.6, in_stock: true },
];

const DEFAULT_CATEGORIES = ['Trending', 'Formal', 'Casual', 'Accessories', 'Shoes'];

const ShopScreen = () => {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Load categories on mount
    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    // Reload products when category changes
    useEffect(() => {
        loadProducts();
    }, [selectedCategory]);

    const loadCategories = async () => {
        try {
            const result = await getCategories();
            if (result.length > 0) {
                setCategories(['Trending', ...result]);
            }
        } catch {
            // Use default categories on error
        }
    };

    const loadProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Default color palette - ideally this would come from user's analysis
            const defaultPalette = ['#000080', '#FFFFFF', '#808080', '#8B4513'];
            const categoryFilter = selectedCategory === 0
                ? categories.slice(1) // All categories except "Trending"
                : [categories[selectedCategory]];

            const result = await discoverProducts(defaultPalette, categoryFilter);

            if (result.success && result.data) {
                // Flatten products from all categories
                const allProducts: Product[] = [];
                Object.values(result.data).forEach(categoryProducts => {
                    allProducts.push(...categoryProducts);
                });

                if (allProducts.length > 0) {
                    setProducts(allProducts);
                } else {
                    // Keep mock data if no products returned
                    setProducts(MOCK_PRODUCTS);
                }
            } else {
                setError(result.error || 'Failed to load products');
                // Keep mock data on error
            }
        } catch {
            setError('Network error. Showing saved products.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        loadProducts();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatPrice = (price: number, currency: string = 'USD') => {
        return `$${price}`;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.background.primary, '#1E1B4B', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Ambient Glows */}
            <View style={[styles.glowBlob, { top: -50, right: -50, backgroundColor: colors.accent.purple }]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            tintColor={colors.accent.primary}
                        />
                    }
                >

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Discover</Text>
                        <View style={styles.searchBar}>
                            <BlurView intensity={20} tint="light" style={styles.searchBlur}>
                                <Search size={20} color={colors.text.muted} />
                                <TextInput
                                    placeholder="Search trends..."
                                    placeholderTextColor={colors.text.muted}
                                    style={styles.input}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                                <TouchableOpacity style={styles.filterBtn}>
                                    <Filter size={18} color="#fff" />
                                </TouchableOpacity>
                            </BlurView>
                        </View>
                    </View>

                    {/* Categories */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.categoryChip}
                                onPress={() => setSelectedCategory(index)}
                            >
                                <LinearGradient
                                    colors={index === selectedCategory ? [colors.accent.primary, colors.accent.gradient.end] : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.05)']}
                                    style={styles.chipGradient}
                                >
                                    <Text style={[styles.chipText, index === selectedCategory && { fontWeight: 'bold' }]}>{cat}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Error message if any */}
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity onPress={handleRefresh} style={styles.retryBtn}>
                                <RefreshCw size={16} color={colors.accent.cyan} />
                                <Text style={styles.retryText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Loading indicator */}
                    {isLoading && !isRefreshing && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.accent.primary} />
                            <Text style={styles.loadingText}>Loading products...</Text>
                        </View>
                    )}

                    {/* Featured Section */}
                    {!isLoading && (
                        <>
                            <Text style={styles.sectionTitle}>
                                {selectedCategory === 0 ? 'Curated For You' : categories[selectedCategory]}
                            </Text>
                            <View style={styles.grid}>
                                {filteredProducts.map((item, index) => (
                                    <Animated.View
                                        key={item.id}
                                        entering={FadeInDown.delay(index * 100)}
                                        style={styles.cardContainer}
                                    >
                                        <TouchableOpacity style={styles.productCard}>
                                            <Image source={{ uri: item.image_url }} style={styles.productImage} />
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                                style={styles.cardOverlay}
                                            >
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.productBrand}>{item.brand}</Text>
                                                    <Text style={styles.productName}>{item.name}</Text>
                                                    <View style={styles.cardFooter}>
                                                        <Text style={styles.productPrice}>{formatPrice(item.price, item.currency)}</Text>
                                                        <View style={styles.ratingBox}>
                                                            <Star size={12} color={colors.accent.gold} fill={colors.accent.gold} />
                                                            <Text style={styles.ratingText}>{item.rating || 4.5}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={styles.heartBtn}>
                                                    <Heart size={16} color="#fff" />
                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </Animated.View>
                                ))}
                            </View>
                        </>
                    )}

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    safeArea: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    glowBlob: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.2,
        transform: [{ scale: 1.5 }],
    },
    header: { padding: 24, paddingBottom: 12 },
    title: { fontSize: 32, fontFamily: typography.fonts.h1, color: '#fff', marginBottom: 16 },
    searchBar: { borderRadius: 16, overflow: 'hidden' },
    searchBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 50,
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.05)'
    },
    input: { flex: 1, color: '#fff', fontFamily: typography.fonts.body, fontSize: 16 },
    filterBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },

    categories: { paddingHorizontal: 24, marginBottom: 24, flexGrow: 0 },
    categoryChip: { marginRight: 12, borderRadius: 20, overflow: 'hidden' },
    chipGradient: { paddingHorizontal: 20, paddingVertical: 10 },
    chipText: { color: '#fff', fontFamily: typography.fonts.h3, fontSize: 14 },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
        gap: 12,
    },
    errorText: { color: colors.text.muted, fontSize: 14 },
    retryBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    retryText: { color: colors.accent.cyan, fontSize: 14 },

    loadingContainer: { alignItems: 'center', paddingVertical: 40 },
    loadingText: { color: colors.text.muted, marginTop: 12 },

    sectionTitle: { paddingHorizontal: 24, fontFamily: typography.fonts.h3, fontSize: 18, color: '#fff', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 24, gap: 16 },
    cardContainer: { width: (width - 48 - 16) / 2 },
    productCard: {
        height: 240,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: colors.background.surface,
        position: 'relative'
    },
    productImage: { width: '100%', height: '100%' },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 130,
        justifyContent: 'flex-end',
        padding: 12
    },
    cardContent: {},
    productBrand: { color: colors.text.muted, fontFamily: typography.fonts.body, fontSize: 11, marginBottom: 2 },
    productName: { color: '#fff', fontFamily: typography.fonts.h3, fontSize: 14, marginBottom: 6 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productPrice: { color: colors.accent.cyan, fontFamily: typography.fonts.h3, fontSize: 16 },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { color: colors.text.muted, fontSize: 12 },
    heartBtn: {
        position: 'absolute',
        top: -110,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20
    }
});

export default ShopScreen;
