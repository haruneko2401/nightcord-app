// src/screens/ServerListScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NightcordBackground from '../components/NightcordBackground';
import theme from '../utils/theme';

const ServerListScreen = ({ navigation }) => {
  const servers = [
    { id: '1', name: 'Nightcord HQ', memberCount: 120, channelCount: 8 },
    { id: '2', name: 'Music Creators', memberCount: 85, channelCount: 5 },
  ];

  return (
    <NightcordBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={theme.moderateScale(20)} color={theme.Colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Servers</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {servers.map(server => (
              <TouchableOpacity 
                key={server.id}
                style={styles.serverCard}
                onPress={() => navigation.navigate('Server', { serverName: server.name })}
                activeOpacity={0.7}
              >
                <View style={styles.serverIcon}>
                  <Icon name="server" size={theme.moderateScale(24)} color={theme.Colors.electricCyan} />
                </View>
                <View style={styles.serverInfo}>
                  <Text style={styles.serverName}>{server.name}</Text>
                  <Text style={styles.serverDetails}>
                    {server.memberCount} thành viên • {server.channelCount} kênh
                  </Text>
                </View>
                <Icon name="chevron-right" size={theme.moderateScale(20)} color={theme.Colors.textMuted} />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate('Server', { serverName: 'New Server' })}
              activeOpacity={0.8}
            >
              <Icon name="plus-circle" size={theme.moderateScale(20)} color={theme.Colors.text} />
              <Text style={styles.createButtonText}>Tạo Server</Text>
            </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.Spacing.md,
    paddingVertical: theme.Spacing.sm + 4,
    backgroundColor: theme.Colors.nightCard,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    padding: theme.Spacing.xs,
  },
  title: {
    fontSize: theme.Sizes.large,
    fontWeight: '700',
    color: theme.Colors.text,
  },
  placeholder: {
    width: theme.moderateScale(36),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.Spacing.md,
    paddingBottom: theme.Spacing.xl,
  },
  serverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.Colors.nightCard,
    borderRadius: theme.moderateScale(8),
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  serverIcon: {
    width: theme.moderateScale(48),
    height: theme.moderateScale(48),
    borderRadius: theme.moderateScale(24),
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.Spacing.md,
  },
  serverInfo: {
    flex: 1,
  },
  serverName: {
    fontSize: theme.Sizes.medium,
    color: theme.Colors.text,
    fontWeight: '600',
    marginBottom: theme.Spacing.xs,
  },
  serverDetails: {
    fontSize: theme.Sizes.small,
    color: theme.Colors.textSecondary,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.Colors.electricPurple,
    borderRadius: theme.moderateScale(8),
    padding: theme.Spacing.md,
    marginTop: theme.Spacing.md,
    shadowColor: theme.Colors.electricPurple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: theme.Sizes.medium,
    color: theme.Colors.text,
    fontWeight: '600',
    marginLeft: theme.Spacing.sm,
  },
});

export default ServerListScreen;
