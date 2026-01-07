import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Home, Shirt, ScanFace, ShoppingBag, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, layout } from '../theme';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, withTiming } from 'react-native-reanimated';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ShopScreen from '../screens/ShopScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Custom Tab Bar Icon Component
const TabIcon = ({ name: Icon, focused, color, size, fill }: any) => {
    const scale = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withSpring(focused ? 1.2 : 1, { damping: 10 });
    }, [focused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
            {/* Fill property for Home icon if needed, or just color */}
            <Icon size={size} color={color} fill={fill ? color : 'transparent'} />
            {focused && (
                <Animated.View entering={withSpring} style={styles.activeDot} />
            )}
        </Animated.View>
    );
};

// Custom Glass Background Component - iOS 26 Liquid Glass (Web Compatible)
const LiquidTabBarBackground = () => {
    return (
        <View style={styles.backgroundContainer}>
            {/* On web, use CSS backdropFilter. On native, use BlurView */}
            {Platform.OS === 'web' ? (
                <View style={styles.webGlass} />
            ) : (
                <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill} />
            )}
            <View style={styles.glassBorder} />
        </View>
    );
};

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarBackground: () => <LiquidTabBarBackground />,
                tabBarActiveTintColor: '#1E293B', // Dark Slate for active icons
                tabBarInactiveTintColor: '#94A3B8', // Muted for inactive
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // Use 'fill' prop to mimic the filled home icon in reference
                    tabBarIcon: (props) => <TabIcon name={Home} {...props} fill={props.focused} />,
                }}
            />

            <Tab.Screen
                name="Discover"
                component={ShopScreen}
                options={{
                    tabBarIcon: (props) => <TabIcon name={ShoppingBag} {...props} />,
                }}
            />

            <Tab.Screen
                name="Analyze"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        // Scan Button Container
                        <View style={styles.scanButtonWrapper}>
                            <LinearGradient
                                colors={['#6366F1', '#3B82F6']} // Indigo to Blue gradient
                                style={[styles.scanButton, focused && styles.scanButtonActive]}
                            >
                                <ScanFace size={28} color="#fff" />
                            </LinearGradient>
                        </View>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />

            <Tab.Screen
                name="Wardrobe"
                component={WardrobeScreen}
                options={{
                    tabBarIcon: (props) => <TabIcon name={Shirt} {...props} />,
                }}
            />

            <Tab.Screen
                name="You"
                component={ProfileScreen}
                options={{
                    // Profile usually filled too
                    tabBarIcon: (props) => <TabIcon name={User} {...props} fill={props.focused} />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        left: 20,
        right: 20,
        height: 80, // Taller bar to contain button better
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        overflow: 'visible',
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 40,
        overflow: 'hidden',
        shadowColor: '#94A3B8',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
    },
    webGlass: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // More transparent for glass effect
        // @ts-ignore - Web only CSS property
        backdropFilter: 'blur(12px)',
        // @ts-ignore - Web only CSS property for Safari
        WebkitBackdropFilter: 'blur(12px)',
    },
    glassBorder: {
        ...StyleSheet.absoluteFillObject,
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1,
        borderRadius: 40,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: 10, // Push icons down to vertically center
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#1E293B',
        marginTop: 4,
        // Removed absolute positioning to simplify layout stack
    },
    scanButtonWrapper: {
        marginTop: 16, // Push button well down into the bar
        justifyContent: 'center',
        alignItems: 'center',
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    scanButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
    scanButtonActive: {
        transform: [{ scale: 1.05 }],
    }
});

export default MainNavigator;
