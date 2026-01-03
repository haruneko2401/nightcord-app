// src/screens/LoadingScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import theme from '../utils/theme';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      // Text fade in
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1200,
        delay: 300,
        useNativeDriver: true,
      }),
      // Dots animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotsAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotsAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Animated dots
  const dots = [0, 1, 2].map((i) => {
    const dotScale = dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.3],
    });

    const dotOpacity = dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });

    return (
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            transform: [{ scale: dotScale }],
            opacity: dotOpacity,
            marginLeft: i === 0 ? 0 : 8,
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {/* Background particles */}
      <View style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                opacity: Math.random() * 0.3 + 0.1,
              },
            ]}
          />
        ))}
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🌙</Text>
          </View>
          <View style={styles.logoRing} />
        </View>

        {/* Title */}
        <Animated.View style={{ opacity: textAnim }}>
          <Text style={styles.title}>NIGHTCORD</Text>
          <Text style={styles.subtitle}>Kết nối sáng tạo về đêm</Text>
        </Animated.View>

        {/* Loading dots */}
        <View style={styles.dotsContainer}>
          <Animated.View style={{ flexDirection: 'row' }}>
            {dots}
          </Animated.View>
          <Text style={styles.loadingText}>Đang khởi tạo...</Text>
        </View>

        {/* Version */}
        <Text style={styles.version}>v1.0.0</Text>
      </Animated.View>

      {/* Bottom wave */}
      <View style={styles.wave}>
        <View style={styles.waveLine} />
        <View style={[styles.waveLine, { marginTop: -10, opacity: 0.3 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#00ffff',
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.Spacing.lg + theme.Spacing.md,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: theme.verticalScale(30),
  },
  logoCircle: {
    width: theme.moderateScale(100),
    height: theme.moderateScale(100),
    borderRadius: theme.moderateScale(50),
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  logoRing: {
    position: 'absolute',
    top: theme.moderateScale(-10),
    left: theme.moderateScale(-10),
    right: theme.moderateScale(-10),
    bottom: theme.moderateScale(-10),
    borderRadius: theme.moderateScale(60),
    borderWidth: 1,
    borderColor: 'rgba(147, 112, 219, 0.2)',
  },
  logoIcon: {
    fontSize: theme.moderateScale(50),
  },
  title: {
    fontSize: theme.responsiveFontSize(32),
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: theme.scale(4),
    marginBottom: theme.Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.Sizes.small + 2,
    color: '#b0b0b0',
    textAlign: 'center',
    letterSpacing: theme.scale(1),
    marginBottom: theme.verticalScale(40),
  },
  dotsContainer: {
    alignItems: 'center',
    marginTop: theme.verticalScale(40),
  },
  dot: {
    width: theme.moderateScale(10),
    height: theme.moderateScale(10),
    borderRadius: theme.moderateScale(5),
    backgroundColor: '#00ffff',
  },
  loadingText: {
    color: '#888',
    fontSize: theme.Sizes.small,
    marginTop: theme.Spacing.md - 1,
    letterSpacing: theme.scale(1),
  },
  version: {
    position: 'absolute',
    bottom: theme.verticalScale(-80),
    color: '#555',
    fontSize: theme.Sizes.small - 1,
    letterSpacing: theme.scale(1),
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: theme.verticalScale(40),
    overflow: 'hidden',
  },
  waveLine: {
    height: theme.verticalScale(20),
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: theme.moderateScale(20),
    borderTopRightRadius: theme.moderateScale(20),
  },
});

export default LoadingScreen;