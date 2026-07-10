import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, Text, TextInput, ActivityIndicator, Alert, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BedDouble, DoorOpen, Edit, Layers, Pencil, Plus, Trash2, Users } from 'lucide-react-native';

import { brachStyle } from '../../../styles/Branch';
import RoomRegisterScreen from '../components/RoomRegisterScreen';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useRooms } from '../hooks/useRoom';
import ScreenHeader from '../../../components/ScreenHeader';
import { useDeleteRoom } from '../hooks/useCreateRoom';
import { Room } from '../types/room';
import BottomSheetModal from '../components/BottomSheetModal';
import RoomCard from '../components/RoomCard';


const RoomScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { branchId } = route.params;
  const { data: rooms = [], isLoading, isError, refetch } = useRooms(branchId);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
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
        <ActivityIndicator size="large" color='#e38144' />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={brachStyle.Center}>
        <Text>Failed to load rooms.</Text>
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
        <FlatList
          data={filteredRooms}
          keyExtractor={(item) => item.id.toString()}
          style={brachStyle.container}
          contentContainerStyle={[
            brachStyle.listContent,
            filteredRooms.length === 0 && {
              flexGrow: 1,
            },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          renderItem={({ item: room }) => (
            <TouchableOpacity
              style={brachStyle.branchCard}
              onPress={() =>
                navigation.navigate('UserScreen', {
                  roomId: room.id,
                  branchId,
                  room,
                })
              }
            >
              <RoomCard
                room={room}
                onEdit={handleEditRoom}
                onDelete={onDelete}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No rooms match your search.'
                : 'No rooms found. Tap + to add one.'}
            </Text>
          }
        />

        <TouchableOpacity
          style={brachStyle.fab}
          onPress={handleOpenModal}
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>
        <BottomSheetModal
          visible={showRoomModal}
          onClose={handleCloseModal}
        >
          <RoomRegisterScreen
            branchId={branchId}
            closeModal={handleCloseModal}
            room={selectedRoom}
          />
        </BottomSheetModal>
      </View>
    </ScreenWrapper>
  );
};

export default RoomScreen;