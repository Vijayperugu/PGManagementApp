import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BedDouble, DoorOpen, Layers, Plus, Users } from 'lucide-react-native';

import { brachStyle } from '../../../styles/Branch';
import RoomRegisterScreen from '../components/RoomRegisterScreen';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useRooms } from '../hooks/useRoom';
import ScreenHeader from '../../../components/ScreenHeader';


const RoomScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { branchId } = route.params;
  const { data: rooms = [], isLoading, isError, refetch } = useRooms(branchId);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const filteredRooms = useMemo(() => {
    if (!debouncedSearchQuery) {
      return rooms;
    }

    return rooms.filter((room: any) => {
      const searchableText = [
        room.roomNumber,
        room.floor,
        room.capacity,
        room.occupied,
        room.availableBeds,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(debouncedSearchQuery);
    });
  }, [rooms, debouncedSearchQuery]);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Failed to load rooms.</Text>

          <TouchableOpacity
            onPress={() => refetch()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ color: '#2563EB', fontWeight: '600' }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={brachStyle.screen}>
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={brachStyle.listContent}
        >
          <ScreenHeader
            title="Rooms"
          />
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search rooms"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {filteredRooms.length > 0 ? (
            filteredRooms.map((room: any) => (
              <TouchableOpacity
                key={room.id}
                style={brachStyle.branchCard}
                onPress={() =>
                  navigation.navigate('UserScreen', {
                    roomId: room.id,
                  })
                }
              >
                <View style={brachStyle.branchCardContent}>
                  <View style={brachStyle.iconBadge}>
                    <BedDouble size={24} color="#2563EB" />
                  </View>

                  <View style={brachStyle.branchInfo}>
                    <Text style={brachStyle.cardTitle}>
                      Room {room.roomNumber}
                    </Text>

                    <Text style={brachStyle.cardSubTitle}>
                      Floor {room.floor}
                    </Text>

                    <View style={brachStyle.cardStatsRow}>
                      <View style={brachStyle.cardStat}>
                        <Users size={14} color="#6B7280" />
                        <Text style={brachStyle.cardStatText}>
                          {room.occupied}/{room.capacity} Occupied
                        </Text>
                      </View>

                      <View style={brachStyle.cardStat}>
                        <DoorOpen size={14} color="#6B7280" />
                        <Text style={brachStyle.cardStatText}>
                          {room.availableBeds} Beds Available
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        brachStyle.cardStatsRow,
                        { marginTop: 8 },
                      ]}
                    >
                      <View style={brachStyle.cardStat}>
                        <Layers size={14} color="#6B7280" />
                        <Text style={brachStyle.cardStatText}>
                          Capacity: {room.capacity}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No rooms match your search.'
                : 'No rooms found. Tap + to add one.'}
            </Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={brachStyle.fab}
          onPress={() => setShowRoomModal(true)}
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        <Modal
          visible={showRoomModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowRoomModal(false)}
        >
          <View style={brachStyle.modalOverlay}>
            <TouchableWithoutFeedback
              onPress={() => setShowRoomModal(false)}
            >
              <View style={brachStyle.modalDismissArea} />
            </TouchableWithoutFeedback>

            <View style={brachStyle.modalSheet}>
              <RoomRegisterScreen
                branchId={branchId}
                closeModal={() => setShowRoomModal(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default RoomScreen;