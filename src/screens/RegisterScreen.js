// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import NightcordBackground from '../components/NightcordBackground';
import theme from '../utils/theme';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleRegister = () => {
    // Tạm thời đăng ký xong thì về Login
    alert('Đăng ký thành công!');
    navigation.goBack();
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

  return (
    <NightcordBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.scrollContent}>
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
              <Text style={styles.welcomeTitle}>Create an account</Text>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    EMAIL <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={theme.Colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>DISPLAY NAME</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    placeholderTextColor={theme.Colors.textMuted}
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    USERNAME <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={theme.Colors.textMuted}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
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

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    DATE OF BIRTH <Text style={styles.required}>*</Text>
                  </Text>
                  <View style={styles.dateContainer}>
                    <View style={styles.dateInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Month"
                        placeholderTextColor={theme.Colors.textMuted}
                        value={month}
                        onChangeText={setMonth}
                      />
                    </View>
                    <View style={styles.dateInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Day"
                        placeholderTextColor={theme.Colors.textMuted}
                        value={day}
                        onChangeText={setDay}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.dateInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Year"
                        placeholderTextColor={theme.Colors.textMuted}
                        value={year}
                        onChangeText={setYear}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setEmailUpdates(!emailUpdates)}
                >
                  <View style={styles.checkbox}>
                    {emailUpdates && <View style={styles.checkboxInner} />}
                  </View>
                  <Text style={styles.checkboxText}>
                    (Optional) It's okay to send me emails with Discord updates,
                    tips, and special offers. You can opt out at any time.
                  </Text>
                </TouchableOpacity>

                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By clicking "Create Account," you agree to Nightcord's{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and
                    have read the{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.loginLink}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </NightcordBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: theme.Spacing.md,
    paddingTop: theme.Spacing.sm + 8,
    paddingBottom: theme.Spacing.sm,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.Spacing.sm,
  },
  logoContainer: {
    width: theme.moderateScale(40),
    height: theme.moderateScale(40),
    borderRadius: theme.moderateScale(20),
    backgroundColor: 'rgba(255, 248, 225, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.Spacing.xs,
    shadowColor: '#fff8e1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: theme.moderateScale(8),
    elevation: 4,
  },
  logo: {
    fontSize: theme.moderateScale(20),
  },
  logoText: {
    fontSize: theme.Sizes.large,
    fontWeight: '700',
    color: theme.Colors.text,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
    padding: theme.Spacing.md,
  },
  welcomeTitle: {
    fontSize: theme.Sizes.medium + 2,
    fontWeight: '600',
    color: theme.Colors.text,
    marginBottom: theme.Spacing.md,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: theme.Spacing.xs + 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.Colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  required: {
    color: theme.Colors.danger,
  },
  input: {
    backgroundColor: theme.Colors.nightInput,
    borderRadius: theme.moderateScale(4),
    paddingVertical: theme.Spacing.xs + 2,
    paddingHorizontal: theme.Spacing.sm,
    color: theme.Colors.text,
    fontSize: theme.Sizes.small + 1,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    height: theme.verticalScale(36),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.Spacing.xs + 2,
  },
  dateInput: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.Spacing.xs + 2,
  },
  checkbox: {
    width: theme.moderateScale(16),
    height: theme.moderateScale(16),
    borderWidth: 1.5,
    borderColor: theme.Colors.textSecondary,
    borderRadius: theme.moderateScale(3),
    marginRight: theme.Spacing.xs,
    marginTop: theme.scale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: theme.moderateScale(9),
    height: theme.moderateScale(9),
    backgroundColor: theme.Colors.electricPurple,
    borderRadius: theme.moderateScale(2),
  },
  checkboxText: {
    flex: 1,
    fontSize: 10,
    color: theme.Colors.textSecondary,
    lineHeight: 14,
  },
  termsContainer: {
    marginBottom: theme.Spacing.xs + 2,
  },
  termsText: {
    fontSize: 10,
    color: theme.Colors.textSecondary,
    lineHeight: 14,
  },
  termsLink: {
    color: theme.Colors.electricCyan,
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: theme.Colors.electricPurple,
    borderRadius: theme.moderateScale(4),
    paddingVertical: theme.Spacing.xs + 4,
    alignItems: 'center',
    marginBottom: theme.Spacing.xs + 2,
    height: theme.verticalScale(38),
    justifyContent: 'center',
    shadowColor: theme.Colors.electricPurple,
    shadowOffset: { width: 0, height: theme.scale(2) },
    shadowOpacity: 0.4,
    shadowRadius: theme.moderateScale(6),
    elevation: 4,
  },
  registerButtonText: {
    color: theme.Colors.text,
    fontSize: theme.Sizes.small + 1,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.Spacing.xs,
  },
  loginText: {
    color: theme.Colors.textSecondary,
    fontSize: theme.Sizes.small - 1,
  },
  loginLink: {
    color: theme.Colors.electricCyan,
    fontSize: theme.Sizes.small - 1,
    fontWeight: '500',
  },
});

export default RegisterScreen;
