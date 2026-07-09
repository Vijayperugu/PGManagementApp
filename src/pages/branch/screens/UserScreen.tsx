import React, { useEffect, useMemo, useState } from 'react';
import {View,Text,TouchableOpacity,Modal,TouchableWithoutFeedback,ScrollView,TextInput,ActivityIndicator} from 'react-native';

import { useRoute } from '@react-navigation/native';

import {Briefcase,CalendarDays,MapPin,Phone,Plus} from 'lucide-react-native';

import { brachStyle } from '../../../styles/Branch';
import ScreenWrapper from '../../../components/ScreenWrapper';
import AddUserScreen from '../components/AddUserScreen';

import { useMembers } from '../hooks/useMembers';

const UserScreen = () => {
  const route = useRoute<any>();
  const { roomId } = route.params;
  const {data: members = [],isLoading,isError,refetch,} = useMembers(roomId);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] =useState('');

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
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={
            brachStyle.userListContent
          }
        >
          <Text style={brachStyle.screenTitle}>
            Members
          </Text>

          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search members"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <View
                key={member.id}
                style={brachStyle.userCard}
              >
                <View style={brachStyle.userInfo}>
                  <Text style={brachStyle.userName}>
                    {member.name}
                  </Text>

                  <Text style={brachStyle.userMeta}>
                    Age {member.age} •{' '}
                    {member.gender}
                  </Text>

                  <View
                    style={
                      brachStyle.userDetailRow
                    }
                  >
                    <Phone
                      size={15}
                      color="#4B5563"
                    />

                    <Text
                      style={
                        brachStyle.userDetailText
                      }
                    >
                      {member.phone}
                    </Text>
                  </View>

                  <View
                    style={
                      brachStyle.userDetailRow
                    }
                  >
                    <Briefcase
                      size={15}
                      color="#4B5563"
                    />

                    <Text
                      style={
                        brachStyle.userDetailText
                      }
                    >
                      {member.occupation}
                    </Text>
                  </View>

                  <View
                    style={
                      brachStyle.userDetailRow
                    }
                  >
                    <CalendarDays
                      size={15}
                      color="#4B5563"
                    />

                    <Text
                      style={
                        brachStyle.userDetailText
                      }
                    >
                      Joined{' '}
                      {member.joiningDate}
                    </Text>
                  </View>

                  <View
                    style={
                      brachStyle.userDetailRow
                    }
                  >
                    <MapPin
                      size={15}
                      color="#4B5563"
                    />

                    <Text
                      style={
                        brachStyle.userDetailText
                      }
                    >
                      {member.address}
                    </Text>
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