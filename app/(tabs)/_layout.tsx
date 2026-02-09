import { Tabs } from 'expo-router';
import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme/ThemeContext';

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0fb14c',
        tabBarInactiveTintColor: isDark ? '#999' : '#666',
        tabBarStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="■" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="▣" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="●" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 24, lineHeight: 24, color: focused ? '#0fb14c' : '#666' }}>
      {name}
    </Text>
  );
}
