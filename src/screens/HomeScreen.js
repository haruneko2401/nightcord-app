// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NightcordBackground from '../components/NightcordBackground';
import theme from '../utils/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <NightcordBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header với Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🌙</Text>
            </View>
            <Text style={styles.logoText}>Nightcord</Text>
            <Text style={styles.subtitle}>Chào mừng đến với Nightcord!</Text>
          </View>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('ServerList')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.Colors.electricBlue, theme.Colors.electricPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Icon name="plus-circle" size={18} color={theme.Colors.text} style={styles.buttonIcon} />
                  <Text style={styles.primaryButtonText}>Tạo Server</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => alert('Tính năng đang phát triển!')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.Colors.electricPurple, theme.Colors.electricPink]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Icon name="account-plus" size={18} color={theme.Colors.text} style={styles.buttonIcon} />
                  <Text style={styles.secondaryButtonText}>Tham gia Server</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <Icon name="account" size={18} color={theme.Colors.electricCyan} />
                </View>
                <Text style={styles.menuText}>Hồ sơ cá nhân</Text>
                <Icon name="chevron-right" size={18} color={theme.Colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Settings')}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <Icon name="cog" size={18} color={theme.Colors.electricCyan} />
                </View>
                <Text style={styles.menuText}>Cài đặt</Text>
                <Icon name="chevron-right" size={18} color={theme.Colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, styles.logoutIconContainer]}>
                  <Icon name="logout" size={18} color={theme.Colors.danger} />
                </View>
                <Text style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
                <Icon name="chevron-right" size={18} color={theme.Colors.textMuted} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </NightcordBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.Spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.Spacing.md,
    paddingBottom: theme.Spacing.md,
  },
  logoContainer: {
    width: theme.moderateScale(48),
    height: theme.moderateScale(48),
    borderRadius: theme.moderateScale(24),
    backgroundColor: 'rgba(255, 248, 225, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.Spacing.sm,
    shadowColor: '#fff8e1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: theme.moderateScale(10),
    elevation: 5,
  },
  logo: {
    fontSize: theme.moderateScale(24),
  },
  logoText: {
    fontSize: theme.Sizes.xlarge,
    fontWeight: '700',
    color: theme.Colors.electricCyan,
    letterSpacing: 0.8,
    marginBottom: theme.Spacing.xs,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: theme.Sizes.small + 1,
    color: theme.Colors.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.Spacing.lg,
  },
  actionsContainer: {
    width: '100%',
    marginBottom: theme.Spacing.lg,
    marginTop: theme.Spacing.sm,
  },
  primaryButton: {
    width: '100%',
    marginBottom: theme.Spacing.sm,
    borderRadius: theme.moderateScale(8),
    overflow: 'hidden',
    shadowColor: theme.Colors.electricBlue,
    shadowOffset: { width: 0, height: theme.scale(2) },
    shadowOpacity: 0.3,
    shadowRadius: theme.moderateScale(8),
    elevation: 4,
  },
  secondaryButton: {
    width: '100%',
    borderRadius: theme.moderateScale(8),
    overflow: 'hidden',
    shadowColor: theme.Colors.electricPurple,
    shadowOffset: { width: 0, height: theme.scale(2) },
    shadowOpacity: 0.3,
    shadowRadius: theme.moderateScale(8),
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: theme.Spacing.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginRight: theme.Spacing.xs,
  },
  primaryButtonText: {
    fontSize: theme.Sizes.medium,
    fontWeight: '600',
    color: theme.Colors.text,
    letterSpacing: 0.3,
  },
  secondaryButtonText: {
    fontSize: theme.Sizes.medium,
    fontWeight: '600',
    color: theme.Colors.text,
    letterSpacing: 0.3,
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.Colors.nightCard,
    borderRadius: theme.moderateScale(6),
    padding: theme.Spacing.sm + 2,
    marginBottom: theme.Spacing.xs + 2,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.12)',
  },
  menuIconContainer: {
    width: theme.moderateScale(32),
    height: theme.moderateScale(32),
    borderRadius: theme.moderateScale(16),
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.Spacing.sm,
  },
  logoutIconContainer: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
  },
  menuText: {
    flex: 1,
    fontSize: theme.Sizes.small + 2,
    color: theme.Colors.text,
    fontWeight: '500',
  },
  logoutText: {
    color: theme.Colors.danger,
  },
});

export default HomeScreen;
