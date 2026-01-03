// src/components/ServerCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../utils/theme';

const ServerCard = ({ server, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🌐</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{server.name}</Text>
        <Text style={styles.members}>
          {server.memberCount} thành viên • {server.channelCount} kênh
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.Colors.backgroundSecondary,
    borderRadius: theme.moderateScale(12),
    padding: theme.Spacing.md,
    marginVertical: theme.Spacing.sm,
    marginHorizontal: theme.Spacing.md,
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: theme.moderateScale(10),
    width: theme.moderateScale(50),
    height: theme.moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.Spacing.md,
  },
  icon: {
    fontSize: theme.moderateScale(24),
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.Sizes.medium,
    color: theme.Colors.text,
    fontWeight: '600',
    marginBottom: theme.Spacing.xs,
  },
  members: {
    fontSize: theme.Sizes.small,
    color: theme.Colors.textSecondary,
  },
  chevron: {
    fontSize: theme.moderateScale(24),
    color: theme.Colors.textSecondary,
    marginLeft: theme.Spacing.sm,
  },
});

export default ServerCard;