import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Briefcase, CalendarDays, MapPin, Phone, Plus } from 'lucide-react-native';

import PgContext from '../../../context/PgContext';
import { brachStyle } from '../../../styles/Branch';
import AddUserScreen from '../components/AddUserScreen';
import ScreenWrapper from '../../../components/ScreenWrapper';

const UserScreen = () => {
  const { members } = useContext(PgContext);
  const route = useRoute<any>();
  const { roomId } = route.params;
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const roomMembers = useMemo(() => {
    const filteredMembers = members.filter(
      (member: any) => member.roomId === roomId
    );

    if (!debouncedSearchQuery) {
      return filteredMembers;
    }

    return filteredMembers.filter((member: any) => {
      const searchableText = [
        member.name,
        member.age,
        member.phone,
        member.occupation,
        member.course,
        member.joiningDate,
        member.address,
        member.email,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(debouncedSearchQuery);
    });
  }, [debouncedSearchQuery, members, roomId]);

  return (
    <ScreenWrapper>
      <View style={brachStyle.screen}>
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={brachStyle.userListContent}
        >
          <Text style={brachStyle.screenTitle}>Users</Text>
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search users"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {roomMembers.length > 0 ? (
            roomMembers.map((member: any) => (
              <View key={member.id} style={brachStyle.userCard}>
                <Image
                  source={{ uri: member.photoUri }}
                  style={brachStyle.userPhoto}
                />
                <View style={brachStyle.userInfo}>
                  <Text style={brachStyle.userName}>{member.name}</Text>
                  <Text style={brachStyle.userMeta}>Age {member.age}</Text>

                  <View style={brachStyle.userDetailRow}>
                    <Phone size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>{member.phone}</Text>
                  </View>
                  <View style={brachStyle.userDetailRow}>
                    <Briefcase size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      {member.occupation || member.course || 'Occupation not added'}
                    </Text>
                  </View>
                  <View style={brachStyle.userDetailRow}>
                    <CalendarDays size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      Joined {member.joiningDate || 'Not added'}
                    </Text>
                  </View>
                  <View style={brachStyle.userDetailRow}>
                    <MapPin size={15} color="#4B5563" />
                    <Text style={brachStyle.userDetailText}>
                      {member.address || 'Address not added'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No users match your search.'
                : 'No users found. Tap + to add one.'}
            </Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={brachStyle.fab}
          onPress={() => setShowUserModal(true)}
        >
          <Plus color="white" size={28} />
        </TouchableOpacity>
        <Modal
          visible={showUserModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowUserModal(false)}
        >
          <View style={brachStyle.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => setShowUserModal(false)}>
              <View style={brachStyle.modalDismissArea} />
            </TouchableWithoutFeedback>
            <View style={brachStyle.userSheet}>
              <AddUserScreen
                closeModal={() => setShowUserModal(false)}
                roomId={roomId}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default UserScreen;
