import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { Briefcase, CalendarDays, MapPin, Phone, Plus, Trash2 } from 'lucide-react-native';

import { brachStyle } from '../../../styles/Branch';
import ScreenWrapper from '../../../components/ScreenWrapper';
import AddUserScreen from '../components/AddUserScreen';

import { useMembers } from '../hooks/useMembers';
import ScreenHeader from '../../../components/ScreenHeader';
import { useDeleteMember } from '../hooks/useCreateMember';

const UserScreen = () => {
  const route = useRoute<any>();
  const { roomId } = route.params;
  const { data: members = [], isLoading, isError, refetch, } = useMembers(roomId);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const deleteMemeberMutation = useDeleteMember(roomId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(
        searchQuery.trim().toLowerCase(),
      );
    }, 300);

    return () => clearTimeout(timeout);
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
  }, [members, debouncedSearchQuery]);


  const deleleteMember = (memberId: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this member?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMemeberMutation.mutate(memberId)
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={brachStyle.Center}>
        
          <ActivityIndicator size="large" />
       
      </View>
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
          <Text>Failed to load members.</Text>

          <TouchableOpacity
            onPress={() => refetch()}
            style={{ marginTop: 15 }}
          >
            <Text
              style={{
                color: '#2563EB',
                fontWeight: '600',
              }}
            >
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
        <View style={brachStyle.headerSection}>
          <ScreenHeader title="Branches" />
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search branches"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

        </View>
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={
            brachStyle.userListContent
          }
        >


          {filteredMembers.length > 0 ? (
            filteredMembers.flatMap(member => (
              <View key={member.id} style={brachStyle.userCard}>
                <View style={brachStyle.userInfo}>
                  <Text style={brachStyle.userName}>
                    {member.name}
                  </Text>

                  <Text style={brachStyle.userMeta}>
                    Age {member.age} •{' '}
                    {member.gender}
                  </Text>

                  <View style={brachStyle.userDetailRow}>
                    <Phone size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      {member.phone}
                    </Text>
                  </View>

                  <View style={brachStyle.userDetailRow}>
                    <Briefcase size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      {member.occupation}
                    </Text>
                  </View>

                  <View style={brachStyle.userDetailRow}>
                    <CalendarDays size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      Joined{' '}{member.joiningDate}
                    </Text>
                  </View>

                  <View style={brachStyle.userDetailRow}>
                    <MapPin size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      {member.address}
                    </Text>
                  </View>
                  <View style={brachStyle.userDetailRow}>
                    <TouchableOpacity onPress={() => deleleteMember(member.id)} >
                      <View style={brachStyle.deleteBoxButton}>
                        <Trash2 size={20} color="#f50303" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No members match your search.'
                : 'No members found. Tap + to add one.'}
            </Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={brachStyle.fab}
          onPress={() =>
            setShowUserModal(true)
          }
        >
          <Plus
            color="white"
            size={28}
          />
        </TouchableOpacity>

        <Modal
          visible={showUserModal}
          animationType="slide"
          transparent
          onRequestClose={() =>
            setShowUserModal(false)
          }
        >
          <View style={brachStyle.modalOverlay}>
            <TouchableWithoutFeedback
              onPress={() =>
                setShowUserModal(false)
              }
            >
              <View
                style={
                  brachStyle.modalDismissArea
                }
              />
            </TouchableWithoutFeedback>

            <View style={brachStyle.userSheet}>
              <AddUserScreen
                roomId={roomId}
                closeModal={() =>
                  setShowUserModal(false)
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default UserScreen;