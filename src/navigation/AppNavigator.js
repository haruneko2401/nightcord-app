// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import các màn hình
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ServerListScreen from '../screens/ServerListScreen';
import ServerScreen from '../screens/ServerScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#0a0a1a"
        barStyle="light-content"
      />
<Stack.Navigator
  initialRouteName="Loading"
  screenOptions={{
    headerStyle: {
      backgroundColor: '#1a1a2e',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    cardStyle: {
      backgroundColor: '#0a0a1a',
    },
  }}
>
  <Stack.Screen
    name="Loading"
    component={LoadingScreen}
    options={{ headerShown: false }}
  />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Hồ sơ' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Cài đặt' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServerList"
          component={ServerListScreen}
          options={{ title: 'Servers' }}
        />
        <Stack.Screen
          name="Server"
          component={ServerScreen}
          options={({ route }) => ({ 
            title: route.params?.serverName || 'Server' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;