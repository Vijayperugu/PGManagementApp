import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { brachStyle } from '../../../styles/Branch'


interface PlusProps {
  onPress: () => void;
}


const Plus = ({ onPress }: PlusProps) => {
  return (
    <TouchableOpacity
      style={brachStyle.fab}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={brachStyle.fabText}>+</Text>
    </TouchableOpacity>
  )
}

export default Plus
