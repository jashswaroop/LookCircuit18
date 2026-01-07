import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, ChevronRight, User, Shield, CreditCard, LogOut } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { colors, typography, layout } from '../theme';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.background.primary, '#000000']} style={StyleSheet.absoluteFillObject} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Header profile info */}
                    <View style={styles.header}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80' }}
                                style={styles.avatar}
                            />
                            <View style={styles.editBadge}>
                                <Settings size={14} color="#fff" />
                            </View>
                        </View>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.email}>john.doe@example.com</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>85</Text>
                                <Text style={styles.statLabel}>Style Score</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>24</Text>
                                <Text style={styles.statLabel}>Items</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>Top 10%</Text>
                                <Text style={styles.statLabel}>Rank</Text>
                            </View>
                        </View>
                    </View>

                    {/* Menu Options */}
                    <View style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>Account</Text>
                        <View style={styles.menuStack}>
                            <MenuItem icon={User} label="Personal Details" />
                            <MenuItem icon={CreditCard} label="Subscription" value="Pro" highlight />
                            <MenuItem icon={Shield} label="Privacy & Security" />
                        </View>
                    </View>

                    <View style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>Preferences</Text>
                        <View style={styles.menuStack}>
                            <MenuItem icon={Settings} label="App Settings" />
                            <LogOutItem />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const MenuItem = ({ icon: Icon, label, value, highlight }: any) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
            <View style={styles.iconBox}>
                <Icon size={20} color={colors.text.secondary} />
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
        </View>
        <View style={styles.menuRight}>
            {value && (
                <View style={[styles.valueBadge, highlight && { backgroundColor: colors.accent.primary }]}>
                    <Text style={[styles.valueText, highlight && { color: '#fff' }]}>{value}</Text>
                </View>
            )}
            <ChevronRight size={20} color={colors.text.muted} />
        </View>
    </TouchableOpacity>
);

const LogOutItem = () => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <LogOut size={20} color="#EF4444" />
            </View>
            <Text style={[styles.menuLabel, { color: '#EF4444' }]}>Log Out</Text>
        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    safeArea: { flex: 1 },
    content: { paddingBottom: 100 },
    header: { alignItems: 'center', padding: 32 },
    avatarContainer: { position: 'relative', marginBottom: 16 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: colors.accent.primary },
    editBadge: {
        position: 'absolute', bottom: 0, right: 0,
        backgroundColor: colors.background.elevated,
        padding: 8, borderRadius: 20,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
    },
    name: { fontSize: 24, fontFamily: typography.fonts.h1, color: '#fff', marginBottom: 4 },
    email: { fontSize: 14, fontFamily: typography.fonts.body, color: colors.text.muted, marginBottom: 24 },
    statsRow: { flexDirection: 'row', alignItems: 'center', gap: 24 },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 20, fontFamily: typography.fonts.h1, color: '#fff' },
    statLabel: { fontSize: 12, fontFamily: typography.fonts.body, color: colors.text.muted },
    statDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.1)' },

    menuSection: { paddingHorizontal: 24, marginBottom: 24 },
    sectionTitle: { fontSize: 14, fontFamily: typography.fonts.h3, color: colors.text.muted, marginBottom: 12, marginLeft: 8 },
    menuStack: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, overflow: 'hidden' },
    menuItem: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)'
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
    menuLabel: { fontSize: 16, fontFamily: typography.fonts.body, color: colors.text.primary },
    menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    valueBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
    valueText: { fontSize: 12, color: colors.text.secondary, fontFamily: typography.fonts.h3 },
});

export default ProfileScreen;
