import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import {View,TouchableOpacity,Text,Modal,ScrollView,TouchableWithoutFeedback,TextInput,ActivityIndicator, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Building2, DoorOpen, Layers, Trash2 } from 'lucide-react-native';

import PgContext from '../../../context/PgContext';
import BranchregisterScreen from '../components/BranchregisterScreen';
import { brachStyle } from '../../../styles/Branch';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { usebranch } from '../hooks/usebranche';
import ScreenHeader from '../../../components/ScreenHeader';
import { useDeleteBranch } from '../hooks/useCreateBranch';
import Plus from '../components/Plus';

const Branch = () => {

  const navigation = useNavigation<any>();
  const deleteBranchMutation = useDeleteBranch();

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

 const onDelete = (branchId: number) => {
     Alert.alert(
       'Confirm Delete',
       'Are you sure you want to delete this Brach?',
       [
         { text: 'Cancel', style: 'cancel' },
         {
           text: 'Delete',
           style: 'destructive',
           onPress: () => deleteBranchMutation.mutate(branchId)
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
          contentContainerStyle={brachStyle.listContent}
        >

          {filteredBranches && filteredBranches.length > 0 ? (
            filteredBranches.map((branch: any) => (
              <TouchableOpacity
                key={branch.id}
                style={brachStyle.branchCard}
                onPress={() => navigation.navigate('Room', { branchId: branch.id })}
              >
                <View style={brachStyle.branchCardContent}>
                  <View style={brachStyle.iconBadge}>
                    <Building2 size={24} color="#e38144" />
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
                    <View style={brachStyle.userDetailRow}>
                      <TouchableOpacity onPress={() => onDelete(branch.id)} >
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
                ? 'No branches match your search.'
                : 'No branches found. Tap + to add one.'}
            </Text>
          )}
        </ScrollView>

        <Plus onPress={handleOpenModal} />

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
