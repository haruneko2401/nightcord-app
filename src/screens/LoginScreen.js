// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import NightcordBackground from '../components/NightcordBackground';
import theme from '../utils/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Tạm thời cho đi thẳng vào Home
    navigation.navigate('Home');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <NightcordBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo và Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🌙</Text>
            </View>
            <Text style={styles.logoText}>Nightcord</Text>
          </View>

          {/* Modal Card */}
          <View style={styles.modalCard}>
            <View style={styles.modalContent}>
              <Text style={styles.welcomeTitle}>Welcome back!</Text>
              <Text style={styles.welcomeSubtitle}>
                We're so excited to see you again!
              </Text>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    EMAIL OR PHONE NUMBER <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email or Phone Number"
                    placeholderTextColor={theme.Colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    PASSWORD <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={theme.Colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.loginButtonText}>
                    {loading ? 'Logging in...' : 'Log In'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Need an account? </Text>
                  <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.registerLink}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </NightcordBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.Spacing.md,
    paddingVertical: theme.Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.Spacing.lg,
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
    color: theme.Colors.text,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  modalCard: {
    backgroundColor: theme.Colors.nightCard,
    borderRadius: theme.moderateScale(8),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: theme.scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: theme.moderateScale(12),
    elevation: 8,
    maxWidth: theme.moderateScale(420),
    alignSelf: 'center',
    width: '100%',
  },
  modalContent: {
    padding: theme.Spacing.lg,
  },
  welcomeTitle: {
    fontSize: theme.Sizes.large,
    fontWeight: '600',
    color: theme.Colors.text,
    marginBottom: theme.Spacing.xs,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: theme.Sizes.small + 1,
    color: theme.Colors.textSecondary,
    marginBottom: theme.Spacing.lg,
    textAlign: 'center',
    lineHeight: 18,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: theme.Spacing.sm + 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.Colors.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  required: {
    color: theme.Colors.danger,
  },
  input: {
    backgroundColor: theme.Colors.nightInput,
    borderRadius: theme.moderateScale(4),
    paddingVertical: theme.Spacing.sm + 2,
    paddingHorizontal: theme.Spacing.sm + 4,
    color: theme.Colors.text,
    fontSize: theme.Sizes.small + 2,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    height: theme.verticalScale(40),
  },
  forgotPassword: {
    marginBottom: theme.Spacing.sm,
  },
  forgotPasswordText: {
    color: theme.Colors.electricCyan,
    fontSize: theme.Sizes.small,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: theme.Colors.electricPurple,
    borderRadius: theme.moderateScale(4),
    paddingVertical: theme.Spacing.sm + 2,
    alignItems: 'center',
    marginBottom: theme.Spacing.sm,
    height: theme.verticalScale(44),
    justifyContent: 'center',
    shadowColor: theme.Colors.electricPurple,
    shadowOffset: { width: 0, height: theme.scale(2) },
    shadowOpacity: 0.4,
    shadowRadius: theme.moderateScale(8),
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: theme.Colors.text,
    fontSize: theme.Sizes.small + 2,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: theme.Colors.textSecondary,
    fontSize: theme.Sizes.small,
  },
  registerLink: {
    color: theme.Colors.electricCyan,
    fontSize: theme.Sizes.small,
    fontWeight: '500',
  },
});

export default LoginScreen;
