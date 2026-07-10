import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, FlatList, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Briefcase, CalendarDays, MapPin, Phone, Plus, Trash2, Pencil } from 'lucide-react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import ScreenHeader from '../../../components/ScreenHeader';
import AddUserScreen from '../components/AddUserScreen';
import { brachStyle } from '../../../styles/Branch';
import { useMembers } from '../hooks/useMembers';
import { useDeleteMember } from '../hooks/useCreateMember';
import { Member } from '../types/members';
import MemberCard from '../components/MemberCard';
const UserScreen = () => {
  const route = useRoute<any>();
  const { roomId, branchId, room } = route.params;
  const { data: members = [], isLoading, isError, refetch, isRefetching } = useMembers(roomId);
  const deleteMemberMutation = useDeleteMember(roomId, branchId);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(
        searchQuery.trim().toLowerCase(),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const filteredMembers = useMemo(() => {
    if (!debouncedSearchQuery) {
      return members;
    }
    return members.filter(member => {
      const searchableText = [
        member.name,
        member.age,
        member.gender,
        member.phone,
        member.occupation,
        member.address,
        member.joiningDate,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(
        debouncedSearchQuery,
      );

    });

  }, [members, debouncedSearchQuery])
  const handleOpenModal = useCallback(() => {
    if (members.length >= room.capacity) {
      Alert.alert(
        'Room Full',
        'Cannot add more members to this room.'
      );
      return;
    }
    setSelectedMember(undefined);
    setShowUserModal(true);
  }, [members, room]);
  const handleCloseModal = useCallback(() => {
    setSelectedMember(undefined);
    setShowUserModal(false);
  }, []);
  const handleEditMember = useCallback((member: Member) => {
    setSelectedMember(member);
    setShowUserModal(true);
  }, []);

  const handleDeleteMember = useCallback(
    (memberId: number) => {
      Alert.alert(
        'Delete Member',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () =>
              deleteMemberMutation.mutate(memberId),
          },
        ],
      );
    },
    [deleteMemberMutation],
  );
  if (isLoading) {
    return (
      <View style={brachStyle.Center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={brachStyle.Center}>
        <Text>
          Failed to load members.
        </Text>
      </View>
    );
  }
  return (
    <ScreenWrapper>
      <View style={brachStyle.screen}>
        <View style={brachStyle.headerSection}>
          <ScreenHeader title="Members" />
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search Members"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

        </View>
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.id.toString()}
          style={brachStyle.container}
          contentContainerStyle={[
            brachStyle.userListContent,
            filteredMembers.length === 0 && {
              flexGrow: 1,
            },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          renderItem={({ item }) => (
            <MemberCard
              member={item}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />

          )}
          ListEmptyComponent={
            <View style={brachStyle.Center}>
              <Text style={brachStyle.emptyText}>
                {debouncedSearchQuery
                  ? 'No members match your search.'
                  : 'No members found. Tap + to add one.'}
              </Text>
            </View>
          }
        />

        <TouchableOpacity style={brachStyle.fab}
          onPress={handleOpenModal}
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        <Modal
          visible={showUserModal}
          animationType="slide"
          transparent
          onRequestClose={handleCloseModal}
        >
          <View style={brachStyle.modalOverlay}>
            <TouchableWithoutFeedback
              onPress={handleCloseModal}
            >
              <View
                style={brachStyle.modalDismissArea}
              />
            </TouchableWithoutFeedback>

            <View style={brachStyle.userSheet}>
              <AddUserScreen
                roomId={roomId}
                branchId={branchId}
                closeModal={handleCloseModal}
                member={selectedMember}
              />
            </View>
          </View>
        </Modal>
      </View>

    </ScreenWrapper>

  );

};

export default UserScreen;