// src/screens/ServerScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NightcordBackground from '../components/NightcordBackground';
import theme from '../utils/theme';

const ServerScreen = ({ route, navigation }) => {
  const { serverName = 'Server' } = route.params || {};
  const [messages, setMessages] = useState([
    { id: '1', text: 'Chào mọi người! 👋', user: 'System', time: '10:00', isMe: false },
    { id: '2', text: 'Chào mừng đến Nightcord!', user: 'Admin', time: '10:01', isMe: false },
    { id: '3', text: 'Server này tuyệt quá! 🎵', user: 'User1', time: '10:05', isMe: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        user: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Auto scroll after sending
      setTimeout(() => {
        scrollToBottom();
      }, 50);
      
      // Auto reply (simulate)
      setTimeout(() => {
        const replies = [
          'Hay quá! 👍',
          'Tôi đồng ý!',
          'Có ai muốn collab không? 🎵',
          'Để tôi thử xem...',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyMessage = {
          id: Date.now().toString() + '_reply',
          text: randomReply,
          user: 'Bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isMe ? styles.myMessage : styles.otherMessage]}>
      <View style={styles.messageHeader}>
        <Text style={[styles.messageUser, item.isMe ? styles.myUser : styles.otherUser]}>
          {item.user}
        </Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <NightcordBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={20} color={theme.Colors.text} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title}>🌐 {serverName}</Text>
              <View style={styles.status}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>5 đang online</Text>
              </View>
            </View>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={true}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nhắn tin..."
              placeholderTextColor={theme.Colors.textMuted}
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={sendMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Icon 
                name="send" 
                size={18} 
                color={newMessage.trim() ? theme.Colors.text : theme.Colors.textMuted} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: theme.Colors.nightCard,
    paddingVertical: theme.Spacing.sm + 4,
    paddingHorizontal: theme.Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    marginRight: theme.Spacing.sm,
    padding: theme.Spacing.xs,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.Sizes.medium + 2,
    color: theme.Colors.electricCyan,
    fontWeight: '700',
    marginBottom: theme.Spacing.xs,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff00',
    marginRight: theme.Spacing.xs,
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  onlineText: {
    fontSize: theme.Sizes.small - 1,
    color: theme.Colors.textSecondary,
  },
  messagesList: {
    padding: theme.Spacing.md,
    paddingBottom: theme.Spacing.lg,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: theme.isTablet() ? '70%' : '80%',
    marginBottom: theme.Spacing.md,
    padding: theme.Spacing.sm + 2,
    borderRadius: theme.moderateScale(12),
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.Colors.electricPurple,
    borderBottomRightRadius: theme.moderateScale(4),
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.Colors.nightCard,
    borderBottomLeftRadius: theme.moderateScale(4),
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.Spacing.xs,
  },
  messageUser: {
    fontSize: theme.Sizes.small,
    fontWeight: '600',
  },
  myUser: {
    color: theme.Colors.electricCyan,
  },
  otherUser: {
    color: theme.Colors.electricPurple,
  },
  messageTime: {
    fontSize: theme.Sizes.small - 2,
    color: theme.Colors.textMuted,
  },
  messageText: {
    color: theme.Colors.text,
    fontSize: theme.Sizes.small + 2,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: theme.Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: theme.Colors.nightCard,
  },
  input: {
    flex: 1,
    backgroundColor: theme.Colors.nightInput,
    borderRadius: theme.moderateScale(20),
    paddingHorizontal: theme.Spacing.md,
    paddingVertical: theme.Spacing.sm,
    color: theme.Colors.text,
    marginRight: theme.Spacing.sm,
    maxHeight: theme.verticalScale(100),
    fontSize: theme.Sizes.small + 2,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  sendButton: {
    backgroundColor: theme.Colors.electricPurple,
    borderRadius: theme.moderateScale(20),
    width: theme.moderateScale(40),
    height: theme.moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.Colors.electricPurple,
    shadowOffset: { width: 0, height: theme.scale(2) },
    shadowOpacity: 0.4,
    shadowRadius: theme.moderateScale(6),
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: theme.Colors.nightInput,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default ServerScreen;
