import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Building2, DoorOpen, Users } from 'lucide-react-native'
import { brachStyle } from '../../../styles/Branch';
import PgContext from '../../../context/PgContext';

const HomeScreen = () => {
  const { branches, rooms, members } = useContext(PgContext);

  return (
    <View style={brachStyle.homeScreen}>
      <Text style={brachStyle.screenTitle}>PG Dashboard</Text>
      <View style={brachStyle.summaryGrid}>
        <View style={brachStyle.summaryCard}>
          <Building2 size={24} color="#2563EB" />
          <Text style={brachStyle.summaryValue}>{branches.length}</Text>
          <Text style={brachStyle.summaryLabel}>Branches</Text>
        </View>
        <View style={brachStyle.summaryCard}>
          <DoorOpen size={24} color="#059669" />
          <Text style={brachStyle.summaryValue}>{rooms.length}</Text>
          <Text style={brachStyle.summaryLabel}>Rooms</Text>
        </View>
        <View style={brachStyle.summaryCard}>
          <Users size={24} color="#DB2777" />
          <Text style={brachStyle.summaryValue}>{members.length}</Text>
          <Text style={brachStyle.summaryLabel}>Users</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen
