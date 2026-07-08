import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Check size={16} color="#fff" strokeWidth={3} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});