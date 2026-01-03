// src/components/NightcordBackground.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale, getScreenWidth, getScreenHeight } from '../utils/responsive';

const { width, height } = Dimensions.get('window');

const NightcordBackground = ({ children }) => {
  // Tạo các điểm sao ngẫu nhiên với nhiều kích thước khác nhau
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.3,
    twinkle: Math.random() > 0.7, // Một số sao sẽ lấp lánh
  }));

  return (
    <View style={styles.container}>
      {/* Gradient nền đêm chính */}
      <LinearGradient
        colors={['#050510', '#0a1628', '#1a0f2e', '#0f0a1a', '#050510']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Gradient overlay màu xanh dương đêm */}
      <LinearGradient
        colors={['rgba(0, 212, 255, 0.08)', 'transparent', 'rgba(139, 92, 246, 0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Gradient overlay màu tím đêm */}
      <LinearGradient
        colors={['transparent', 'rgba(255, 0, 255, 0.05)', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Các hình dạng mờ phía sau với màu đêm */}
      <View style={[styles.blurShape, styles.shape1]} />
      <View style={[styles.blurShape, styles.shape2]} />
      <View style={[styles.blurShape, styles.shape3]} />
      <View style={[styles.blurShape, styles.shape4]} />

      {/* Các điểm sao */}
      {stars.map((star) => (
        <View
          key={star.id}
          style={[
            styles.star,
            star.twinkle && styles.twinklingStar,
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
        />
      ))}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  blurShape: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.12,
  },
  shape1: {
    width: moderateScale(400),
    height: moderateScale(400),
    backgroundColor: '#00d4ff',
    top: moderateScale(-100),
    left: moderateScale(-100),
  },
  shape2: {
    width: moderateScale(350),
    height: moderateScale(350),
    backgroundColor: '#8b5cf6',
    bottom: moderateScale(-50),
    right: moderateScale(-50),
  },
  shape3: {
    width: moderateScale(250),
    height: moderateScale(250),
    backgroundColor: '#ff00ff',
    top: '40%',
    right: '10%',
  },
  shape4: {
    width: moderateScale(200),
    height: moderateScale(200),
    backgroundColor: '#00ffff',
    top: '60%',
    left: '5%',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  twinklingStar: {
    shadowColor: '#00d4ff',
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});

export default NightcordBackground;

