import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, Text, Modal, ScrollView, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Building2, DoorOpen, Layers, PencilLine, Trash2 } from 'lucide-react-native';

import BranchregisterScreen from '../components/BranchregisterScreen';
import { brachStyle } from '../../../styles/Branch';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useBranch } from '../hooks/usebranche';
import ScreenHeader from '../../../components/ScreenHeader';
import { useDeleteBranch } from '../hooks/useCreateBranch';
import Plus from '../components/Plus';
import { BranchType } from '../types/branch';
import BottomSheetModal from '../components/BottomSheetModal';
import BranchCard from '../components/BranchCard';

const Branch = () => {
  const navigation = useNavigation<any>();
  const deleteBranchMutation = useDeleteBranch();
  const { data: branches = [], isLoading, isRefetching, refetch } = useBranch();
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchType | undefined>(undefined);
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
    setSelectedBranch(undefined)
    setShowBranchModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowBranchModal(false);
    setSelectedBranch(undefined);
  }, []);

  const handleEditBranch = useCallback((branch: BranchType) => {
    setSelectedBranch(branch);
    setShowBranchModal(true);
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
        <ActivityIndicator size="large" color='#e38144' />
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
        <FlatList
          data={filteredBranches}
          keyExtractor={(item) => item.id.toString()}
          style={brachStyle.container}
          contentContainerStyle={[
            brachStyle.listContent,
            filteredBranches.length === 0 && {
              flexGrow: 1,
            },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          renderItem={({ item: branch }) => (
            <TouchableOpacity
              style={brachStyle.branchCard}
              onPress={() =>
                navigation.navigate('Room', {
                  branchId: branch.id,
                })
              }
            >
              <BranchCard
                branch={branch}
                onEdit={handleEditBranch}
                onDelete={onDelete}
              />
              
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={brachStyle.emptyText}>
              {debouncedSearchQuery
                ? 'No branches match your search.'
                : 'No branches found. Tap + to add one.'}
            </Text>
          }
        />
        <Plus onPress={handleOpenModal} />
        {showBranchModal && (
          <BottomSheetModal
            visible={showBranchModal}
            onClose={handleCloseModal}
          >
            <BranchregisterScreen closeModal={handleCloseModal} branch={selectedBranch} />
          </BottomSheetModal>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Branch;
