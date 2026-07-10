import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {View,TouchableOpacity,Modal,TouchableWithoutFeedback,ScrollView,Text,TextInput,ActivityIndicator,Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BedDouble, DoorOpen, Edit, Layers, Pencil, Plus, Trash2, Users } from 'lucide-react-native';

import { brachStyle } from '../../../styles/Branch';
import RoomRegisterScreen from '../components/RoomRegisterScreen';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useRooms } from '../hooks/useRoom';
import ScreenHeader from '../../../components/ScreenHeader';
import { useDeleteRoom } from '../hooks/useCreateRoom';
import { Room } from '../types/room';


const RoomScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { branchId } = route.params;
  const { data: rooms = [], isLoading, isError, refetch } = useRooms(branchId);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room |undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const deleteRoomMutation = useDeleteRoom(branchId);

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

  const handleOpenModal = useCallback(() => {
    setSelectedRoom(undefined);
    setShowRoomModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowRoomModal(false);
    setSelectedRoom(undefined);
  }, []);

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowRoomModal(true);
  };

  const onDelete = (roomId: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this member?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteRoomMutation.mutate(roomId)
        },
      ]
    );
  }

  if (isLoading) {
    return (
      <View style={brachStyle.Center}>
          <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
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
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <View style={brachStyle.screen}>

        <View style={brachStyle.headerSection}>
          <ScreenHeader title="Rooms" />
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search Rooms"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

        </View>
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={brachStyle.listContent}
        >


          {filteredRooms.length > 0 ? (
            filteredRooms.map((room: any) => (
              <TouchableOpacity
                key={room.id}
                style={brachStyle.branchCard}
                onPress={() =>
                  navigation.navigate('UserScreen', {
                    roomId: room.id,
                    branchId: branchId,
                    room:room
                  })
                }
              >
                <View style={brachStyle.branchCardContent}>
                  <View style={brachStyle.iconBadge}>
                    <BedDouble size={24} color="#e38144" />
                  </View>

                  <View style={brachStyle.branchInfo}>
                    <Text style={brachStyle.cardTitle}>
                      Room {room.roomNumber}
                    </Text>
                    <View style={brachStyle.cardStat}>
                      <Layers size={14} color="#6B7280" />
                      <Text style={brachStyle.cardStatText}>
                        floor: {room.floor}
                      </Text>
                    </View>
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
                    <View style={brachStyle.cardStat}>
                      <Layers size={14} color="#6B7280" />
                      <Text style={brachStyle.cardStatText}>
                        Capacity: {room.capacity}
                      </Text>
                    </View>
                    <View style={brachStyle.userDetailRow}>
                      <TouchableOpacity onPress={() => handleEditRoom(room)} >
                        <View style={brachStyle.deleteBoxButton}>
                          <Pencil size={20} color="#007AFF" />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => onDelete(room.id)} >
                        <View style={brachStyle.deleteBoxButton}>
                          <Trash2 size={20} color="#f50303" />
                        </View>
                      </TouchableOpacity>
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
          onPress={handleOpenModal}
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        <Modal
          visible={showRoomModal}
          animationType="slide"
          transparent
          onRequestClose={handleCloseModal}
        >
          <View style={brachStyle.modalOverlay}>
            <TouchableWithoutFeedback
              onPress={handleCloseModal}
            >
              <View style={brachStyle.modalDismissArea} />
            </TouchableWithoutFeedback>

            <View style={brachStyle.modalSheet}>
              <RoomRegisterScreen
                branchId={branchId}
                closeModal={handleCloseModal}
                room={selectedRoom}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default RoomScreen;