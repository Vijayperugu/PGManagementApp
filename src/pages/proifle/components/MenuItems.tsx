// src/components/MenuItem.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { MenuItem as MenuItemType  } from '../data/menuData';

interface MenuItemProps {
  item: MenuItemType;
  onPress: (item: MenuItemType) => void;
  isLast?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onPress, isLast }) => {
  const IconComponent = item.icon;

  return (
    <TouchableOpacity
      style={[styles.menuItem, isLast && styles.menuItemLast]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <IconComponent 
          size={22} 
          color={item.isDestructive ? '#FF3B30' : '#555'} 
        />
        <Text style={[
          styles.menuText,
          item.isDestructive && styles.menuTextDestructive
        ]}>
          {item.title}
        </Text>
      </View>
      <View style={styles.menuRight}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        {!item.isDestructive && <ChevronRight size={20} color="#ccc" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    borderRadius:2
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight:500
  },
  menuTextDestructive: {
    color: '#FF3B30',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});