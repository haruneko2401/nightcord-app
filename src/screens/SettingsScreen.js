// src/screens/SettingsScreen.js - ADVANCED WORKING VERSION
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import theme from '../utils/theme';

const SettingsScreen = ({ navigation }) => {
  // State cho settings
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    sound: true,
    vibration: true,
    autoDownload: false,
    dataSaver: false,
  });

  const [volume, setVolume] = useState(70);
  const [fontSize, setFontSize] = useState(16);
  const [cacheSize, setCacheSize] = useState('245 MB');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  // Update setting
  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  // Xóa cache
  const clearCache = () => {
    Alert.alert(
      'Xóa cache',
      `Bạn có chắc muốn xóa ${cacheSize} dữ liệu cache?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setCacheSize('0 MB');
            Alert.alert('Thành công', 'Đã xóa cache');
          },
        },
      ]
    );
  };

  // Settings groups
  const settingsGroups = [
    {
      title: 'GIAO DIỆN',
      items: [
        {
          icon: '🎨',
          label: 'Chủ đề',
          value: settings.theme === 'dark' ? 'Tối' : 'Sáng',
          type: 'select',
          onPress: () => {
            setModalType('theme');
            setModalVisible(true);
          },
        },
        {
          icon: '🔤',
          label: 'Cỡ chữ',
          value: `${fontSize}px`,
          type: 'select',
          onPress: () => {
            setModalType('fontSize');
            setModalVisible(true);
          },
        },
        {
          icon: '🖼️',
          label: 'Hình nền chat',
          value: 'Mặc định',
          type: 'action',
          onPress: () => Alert.alert('Hình nền', 'Chọn hình nền cho chat'),
        },
      ],
    },
    {
      title: 'THÔNG BÁO & ÂM THANH',
      items: [
        {
          icon: '🔔',
          label: 'Thông báo',
          value: settings.notifications,
          type: 'switch',
          onToggle: () => updateSetting('notifications', !settings.notifications),
        },
        {
          icon: '🔊',
          label: 'Âm thanh',
          value: settings.sound,
          type: 'switch',
          onToggle: () => updateSetting('sound', !settings.sound),
        },
        {
          icon: '📳',
          label: 'Rung',
          value: settings.vibration,
          type: 'switch',
          onToggle: () => updateSetting('vibration', !settings.vibration),
        },
        {
          icon: '🎚️',
          label: 'Âm lượng thông báo',
          value: `${volume}%`,
          type: 'slider',
          onPress: () => {
            setModalType('volume');
            setModalVisible(true);
          },
        },
      ],
    },
    {
      title: 'DỮ LIỆU & LƯU TRỮ',
      items: [
        {
          icon: '⬇️',
          label: 'Tự động tải file',
          value: settings.autoDownload,
          type: 'switch',
          onToggle: () => updateSetting('autoDownload', !settings.autoDownload),
        },
        {
          icon: '💾',
          label: 'Tiết kiệm dữ liệu',
          value: settings.dataSaver,
          type: 'switch',
          onToggle: () => updateSetting('dataSaver', !settings.dataSaver),
        },
        {
          icon: '🗃️',
          label: 'Dữ liệu cache',
          value: cacheSize,
          type: 'action',
          onPress: clearCache,
        },
      ],
    },
    {
      title: 'NGÔN NGỮ & VÙNG',
      items: [
        {
          icon: '🌐',
          label: 'Ngôn ngữ',
          value: 'Tiếng Việt',
          type: 'select',
          onPress: () => Alert.alert('Ngôn ngữ', 'Chọn ngôn ngữ hiển thị'),
        },
        {
          icon: '🕐',
          label: 'Múi giờ',
          value: 'GMT+7 (Việt Nam)',
          type: 'select',
          onPress: () => Alert.alert('Múi giờ', 'Chọn múi giờ'),
        },
      ],
    },
    {
      title: 'TÀI KHOẢN & BẢO MẬT',
      items: [
        {
          icon: '🛡️',
          label: 'Bảo mật',
          value: '',
          type: 'action',
          onPress: () => Alert.alert('Bảo mật', 'Cài đặt bảo mật tài khoản'),
        },
        {
          icon: '🔒',
          label: 'Quyền riêng tư',
          value: '',
          type: 'action',
          onPress: () => Alert.alert('Quyền riêng tư', 'Cài đặt quyền riêng tư'),
        },
        {
          icon: '👥',
          label: 'Quản lý thiết bị',
          value: '1 thiết bị',
          type: 'action',
          onPress: () => Alert.alert('Thiết bị', 'Xem và quản lý thiết bị đăng nhập'),
        },
      ],
    },
  ];

  // Render setting item
  const renderSettingItem = (item, index) => {
    if (item.type === 'switch') {
      return (
        <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onToggle}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>{item.icon}</Text>
            <Text style={styles.settingLabel}>{item.label}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#333', true: '#4a1e6d' }}
            thumbColor={item.value ? '#9370DB' : '#888'}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingIcon}>{item.icon}</Text>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  // Render modal content
  const renderModalContent = () => {
    switch (modalType) {
      case 'theme':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn chủ đề</Text>
            {['Tối', 'Sáng', 'Tự động'].map((theme) => (
              <TouchableOpacity
                key={theme}
                style={styles.modalOption}
                onPress={() => {
                  setSettings({ ...settings, theme: theme === 'Tối' ? 'dark' : 'light' });
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{theme}</Text>
                {settings.theme === (theme === 'Tối' ? 'dark' : 'light') && (
                  <Text style={styles.selected}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'fontSize':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cỡ chữ: {fontSize}px</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Nhỏ</Text>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${((fontSize - 12) / 12) * 100}%` }]} />
                <TouchableOpacity
                  style={[styles.sliderThumb, { left: `${((fontSize - 12) / 12) * 100}%` }]}
                />
              </View>
              <Text style={styles.sliderLabel}>Lớn</Text>
            </View>
            <View style={styles.sizeButtons}>
              {[12, 14, 16, 18, 20].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, fontSize === size && styles.sizeButtonActive]}
                  onPress={() => setFontSize(size)}
                >
                  <Text style={[styles.sizeButtonText, fontSize === size && styles.sizeButtonTextActive]}>
                    A
                  </Text>
                  <Text style={styles.sizeButtonLabel}>{size}px</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        );

      case 'volume':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Âm lượng: {volume}%</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>0%</Text>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${volume}%` }]} />
                <TouchableOpacity
                  style={[styles.sliderThumb, { left: `${volume}%` }]}
                  onPressIn={() => {}} // Slider interaction
                />
              </View>
              <Text style={styles.sliderLabel}>100%</Text>
            </View>
            <View style={styles.volumeButtons}>
              {[0, 25, 50, 75, 100].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={styles.volumeButton}
                  onPress={() => setVolume(level)}
                >
                  <Text style={styles.volumeButtonText}>{level}%</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <TouchableOpacity onPress={() => Alert.alert('Trợ giúp', 'Cần hỗ trợ cài đặt?')}>
          <Text style={styles.helpButton}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <ScrollView style={styles.content}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContent}>
              {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* Advanced Settings */}
        <View style={styles.advancedSection}>
          <Text style={styles.groupTitle}>NÂNG CAO</Text>
          <TouchableOpacity style={styles.advancedButton} onPress={() => Alert.alert('Báo lỗi', 'Gửi báo cáo lỗi')}>
            <Text style={styles.advancedIcon}>🐛</Text>
            <Text style={styles.advancedText}>Báo lỗi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.advancedButton} onPress={() => Alert.alert('Nhật ký', 'Xem nhật ký hoạt động')}>
            <Text style={styles.advancedIcon}>📜</Text>
            <Text style={styles.advancedText}>Nhật ký hoạt động</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.advancedButton} onPress={() => Alert.alert('Về ứng dụng', 'Nightcord v1.0.0\nKết nối sáng tạo về đêm')}>
            <Text style={styles.advancedIcon}>ℹ️</Text>
            <Text style={styles.advancedText}>Về ứng dụng</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Đăng xuất', onPress: () => navigation.navigate('Login') },
            ]);
          }}
        >
          <Text style={styles.logoutText}>🚪 Đăng xuất</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Nightcord v1.0.0 • Build 2024.01.01</Text>
      </ScrollView>

      {/* Modal for detailed settings */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            {renderModalContent()}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  backButton: {
    fontSize: theme.moderateScale(28),
    color: '#ffffff',
    fontWeight: '200',
  },
  headerTitle: {
    fontSize: theme.Sizes.medium + 2,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  helpButton: {
    fontSize: theme.Sizes.large,
    color: '#00ffff',
    fontWeight: 'bold',
    width: theme.moderateScale(30),
    height: theme.moderateScale(30),
    borderRadius: theme.moderateScale(15),
    borderWidth: 2,
    borderColor: '#00ffff',
    textAlign: 'center',
    lineHeight: theme.moderateScale(26),
  },
  content: {
    flex: 1,
  },
  settingsGroup: {
    marginBottom: 5,
  },
  groupTitle: {
    fontSize: theme.Sizes.small,
    color: '#888',
    fontWeight: '600',
    marginLeft: theme.Spacing.md + theme.Spacing.xs,
    marginTop: theme.verticalScale(20),
    marginBottom: theme.Spacing.sm + 2,
    letterSpacing: theme.scale(1),
  },
  groupContent: {
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2a2a3e',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.Spacing.md + theme.Spacing.xs,
    paddingVertical: theme.verticalScale(18),
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: theme.moderateScale(22),
    marginRight: theme.Spacing.md - 1,
    width: theme.moderateScale(30),
    textAlign: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: theme.Sizes.medium,
    color: '#fff',
    marginBottom: theme.scale(2),
  },
  settingValue: {
    fontSize: theme.Sizes.small,
    color: '#888',
  },
  chevron: {
    fontSize: theme.moderateScale(24),
    color: '#888',
    fontWeight: '100',
  },
  advancedSection: {
    paddingHorizontal: theme.Spacing.md + theme.Spacing.xs,
    marginTop: theme.Spacing.sm + 2,
  },
  advancedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: theme.Spacing.md - 1,
    borderRadius: theme.moderateScale(10),
    marginBottom: theme.Spacing.sm + 2,
  },
  advancedIcon: {
    fontSize: theme.Sizes.large,
    marginRight: theme.Spacing.md - 1,
  },
  advancedText: {
    color: '#fff',
    fontSize: theme.Sizes.medium,
    flex: 1,
  },
  logoutButton: {
    marginHorizontal: theme.Spacing.md + theme.Spacing.xs,
    marginTop: theme.verticalScale(30),
    marginBottom: theme.verticalScale(20),
    padding: theme.Spacing.md,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: theme.moderateScale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#ff4444',
    fontSize: theme.Sizes.medium,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#555',
    fontSize: theme.Sizes.small - 1,
    marginBottom: theme.verticalScale(30),
    letterSpacing: theme.scale(0.5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalWrapper: {
    width: '90%',
    maxWidth: theme.moderateScale(400),
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: theme.moderateScale(15),
    padding: theme.verticalScale(25),
    marginBottom: theme.Spacing.sm + 2,
  },
  modalTitle: {
    fontSize: theme.Sizes.large,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: theme.verticalScale(20),
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.Spacing.md - 1,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: theme.Sizes.medium,
  },
  selected: {
    color: '#00ffff',
    fontSize: theme.Sizes.large,
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  sliderLabel: {
    color: '#888',
    fontSize: 12,
    width: 40,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginHorizontal: 10,
    position: 'relative',
  },
  sliderFill: {
    height: 6,
    backgroundColor: '#00ffff',
    borderRadius: 3,
    position: 'absolute',
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#9370DB',
    borderRadius: 12,
    top: -9,
    marginLeft: -12,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2a2a3e',
  },
  sizeButtonActive: {
    backgroundColor: '#4a1e6d',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#888',
  },
  sizeButtonTextActive: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sizeButtonLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  volumeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  volumeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#2a2a3e',
  },
  volumeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalButton: {
    backgroundColor: '#4a1e6d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#2a2a3e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;