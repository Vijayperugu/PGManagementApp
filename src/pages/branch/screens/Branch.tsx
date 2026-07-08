import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Building2, DoorOpen, Layers } from 'lucide-react-native';

import PgContext from '../../../context/PgContext';
import BranchregisterScreen from '../components/BranchregisterScreen';
import { brachStyle } from '../../../styles/Branch';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { usebranch } from '../hooks/usebranche';

const Branch = () => {

  const navigation = useNavigation<any>();

  const { data: branches = [], isLoading, isError, refetch } = usebranch();
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const filteredBranches = useMemo(() => {
    if (!debouncedSearchQuery) {
      return branches;
    }

    return branches.filter((branch: any) => {
      const searchableText = [
        branch.name,
        branch.address,
        branch.totalRooms,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(debouncedSearchQuery);
    });
  }, [branches, debouncedSearchQuery]);

  const handleOpenModal = useCallback(() => {
    setShowBranchModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowBranchModal(false);
  }, []);

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



  return (
    <ScreenWrapper>
      <View style={brachStyle.screen}>
        <ScrollView
          style={brachStyle.container}
          contentContainerStyle={brachStyle.listContent}
        >
          <Text style={brachStyle.screenTitle}>Branches</Text>
          <TextInput
            style={brachStyle.searchInput}
            placeholder="Search branches"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {filteredBranches && filteredBranches.length > 0 ? (
            filteredBranches.map((branch: any) => (
              <TouchableOpacity
                key={branch.id}
                style={brachStyle.branchCard}
                onPress={() => navigation.navigate('Room', { branchId: branch.id })}
              >
                <View style={brachStyle.branchCardContent}>
                  <View style={brachStyle.iconBadge}>
                    <Building2 size={24} color="#2563EB" />
                  </View>
                  <View style={brachStyle.branchInfo}>
                    <Text style={brachStyle.cardTitle}>{branch.name}</Text>
                    <Text style={brachStyle.cardSubTitle}>{branch.address}</Text>
                    <View style={brachStyle.cardStatsRow}>
                      <View style={brachStyle.cardStat}>
                        <Layers size={14} color="#6B7280" />
                        <Text style={brachStyle.cardStatText}>{branch.totalFloors || 0} floors</Text>
                      </View>
                      <View style={brachStyle.cardStat}>
                        <DoorOpen size={14} color="#6B7280" />
                        <Text style={brachStyle.cardStatText}>{branch.totalRooms || 0} rooms</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No branches match your search.'
                : 'No branches found. Tap + to add one.'}
            </Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={brachStyle.fab}
          onPress={handleOpenModal}
          activeOpacity={0.7}
        >
          <Text style={brachStyle.fabText}>+</Text>
        </TouchableOpacity>

        {showBranchModal && (
          <Modal
            visible={showBranchModal}
            animationType="slide"
            transparent
            onRequestClose={handleCloseModal}
          >
            <View style={brachStyle.modalOverlay}>
              <TouchableWithoutFeedback onPress={handleCloseModal}>
                <View style={brachStyle.modalDismissArea} />
              </TouchableWithoutFeedback>
              <View style={brachStyle.modalSheet}>
                <BranchregisterScreen closeModal={handleCloseModal} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Branch;
