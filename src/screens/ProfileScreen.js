// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../utils/theme';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'user@nightcord.com',
    bio: '🎵 Nhạc sĩ nghiệp dư | 🎨 Designer về đêm',
    avatar: 'https://i.pravatar.cc/150?img=1',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    soundEffects: true,
    autoPlay: false,
  });

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Thành công', 'Thông tin đã được cập nhật');
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const menuItems = [
    { icon: 'account-group', label: 'Bạn bè', onPress: () => Alert.alert('Tính năng đang phát triển') },
    { icon: 'server', label: 'Servers của tôi', onPress: () => navigation.navigate('ServerList') },
    { icon: 'bell', label: 'Thông báo', onPress: () => Alert.alert('Tính năng đang phát triển') },
    { icon: 'shield', label: 'Bảo mật', onPress: () => Alert.alert('Tính năng đang phát triển') },
    { icon: 'help-circle', label: 'Trợ giúp', onPress: () => Alert.alert('Tính năng đang phát triển') },
    { icon: 'information', label: 'Về Nightcord', onPress: () => Alert.alert('Nightcord v1.0.0', 'Ứng dụng kết nối sáng tạo về đêm') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={theme.moderateScale(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Icon name={isEditing ? 'close' : 'pencil'} size={theme.moderateScale(24)} color="#00ffff" />
        </TouchableOpacity>
      </View>

      {/* Avatar & Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          {isEditing && (
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={theme.moderateScale(20)} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <View style={styles.editForm}>
            <TextInput
              style={styles.input}
              value={tempUser.name}
              onChangeText={(text) => setTempUser({ ...tempUser, name: text })}
              placeholder="Tên"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              value={tempUser.email}
              onChangeText={(text) => setTempUser({ ...tempUser, email: text })}
              placeholder="Email"
              placeholderTextColor="#666"
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={tempUser.bio}
              onChangeText={(text) => setTempUser({ ...tempUser, bio: text })}
              placeholder="Giới thiệu bản thân"
              placeholderTextColor="#666"
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Servers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>45</Text>
                <Text style={styles.statLabel}>Bạn bè</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>156</Text>
                <Text style={styles.statLabel}>Tin nhắn</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        {Object.entries(settings).map(([key, value]) => (
          <View key={key} style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>
                {key === 'darkMode' && 'Chế độ tối'}
                {key === 'notifications' && 'Thông báo'}
                {key === 'soundEffects' && 'Hiệu ứng âm thanh'}
                {key === 'autoPlay' && 'Tự động phát media'}
              </Text>
              <Text style={styles.settingDescription}>
                {key === 'darkMode' && 'Giao diện tối cho ban đêm'}
                {key === 'notifications' && 'Nhận thông báo từ server'}
                {key === 'soundEffects' && 'Âm thanh khi nhắn tin'}
                {key === 'autoPlay' && 'Tự động phát video/âm thanh'}
              </Text>
            </View>
            <Switch
              value={value}
              onValueChange={() => toggleSetting(key)}
              trackColor={{ false: '#333', true: '#4a1e6d' }}
              thumbColor={value ? '#9370DB' : '#888'}
            />
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Icon name={item.icon} size={theme.moderateScale(24)} color="#00ffff" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Icon name="chevron-right" size={theme.moderateScale(20)} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Đăng xuất', style: 'destructive', onPress: () => navigation.navigate('Login') },
          ]);
        }}
      >
        <Icon name="logout" size={theme.moderateScale(20)} color="#ff4444" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Nightcord v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.Spacing.md + theme.Spacing.xs,
    paddingVertical: theme.Spacing.md - 1,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  headerTitle: {
    fontSize: theme.Sizes.medium + 2,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: theme.verticalScale(30),
    paddingHorizontal: theme.Spacing.md + theme.Spacing.xs,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.verticalScale(20),
  },
  avatar: {
    width: theme.moderateScale(120),
    height: theme.moderateScale(120),
    borderRadius: theme.moderateScale(60),
    borderWidth: 3,
    borderColor: '#00ffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4a1e6d',
    width: theme.moderateScale(36),
    height: theme.moderateScale(36),
    borderRadius: theme.moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0a0a1a',
  },
  editForm: {
    width: '100%',
    marginTop: theme.verticalScale(20),
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: theme.moderateScale(10),
    padding: theme.Spacing.md - 1,
    color: '#fff',
    marginBottom: theme.Spacing.md - 1,
    fontSize: theme.Sizes.medium,
  },
  bioInput: {
    height: theme.verticalScale(100),
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4a1e6d',
    borderRadius: theme.moderateScale(10),
    padding: theme.Spacing.md - 1,
    alignItems: 'center',
    marginTop: theme.Spacing.sm + 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: theme.Sizes.medium,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: theme.Sizes.xlarge,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: theme.Spacing.xs + 1,
  },
  email: {
    fontSize: theme.Sizes.medium,
    color: '#888',
    marginBottom: theme.Spacing.md - 1,
  },
  bio: {
    fontSize: theme.Sizes.small + 2,
    color: '#b0b0b0',
    textAlign: 'center',
    lineHeight: theme.verticalScale(20),
    marginBottom: theme.verticalScale(25),
    paddingHorizontal: theme.Spacing.md + theme.Spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    color: '#00ffff',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  settingsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1a1a2e',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    marginBottom: 30,
  },
});

export default ProfileScreen;