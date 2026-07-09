import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  BranchFormData,
  branchSchema,
} from '../schemas/brancSchema';

import { style } from '../../../styles/login';
import { useCreateBranch, useUpdateBranch } from '../hooks/useCreateBranch';
import { BranchType } from '../types/branch';


interface BranchRegisterProps {
  closeModal: () => void;
  branch?: BranchType
}

const BranchregisterScreen = ({ closeModal, branch }: BranchRegisterProps) => {
  const createBranchMutation = useCreateBranch()
  const updateBranchMutation = useUpdateBranch()
  const { control, handleSubmit, formState: { errors }, reset } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branchName: '',
      address: '',
    },
    mode: 'all',
  });

  useEffect(() => {
    if (branch) {
      reset({
        branchName: branch.name,
        address: branch.address,
      });
    } else {
      reset({
        branchName: '',
        address: ""

      })
    }
  }, [branch, reset])

  const onSubmit = (data: BranchFormData) => {

    const requestData = {
      name: data.branchName,
      address: data.address
    }

    if (branch) {
      updateBranchMutation.mutate({
        id: branch.id,
        data: requestData
      },
        {
          onSuccess: () => {
            closeModal()
          }
        }
      );
      return
    }
    createBranchMutation.mutate(requestData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };
  const isLoading = createBranchMutation.isPending || updateBranchMutation.isPending;
  return (
    <View style={style.screen}>
      <ScrollView
        contentContainerStyle={style.branchContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={style.title}>{branch ? 'Edit Branch' : 'Add New Branch'}</Text>

        <Controller
          control={control}
          name="branchName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={style.input}
              placeholder="Enter Branch Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />

        {errors.branchName && (
          <Text style={style.errorText}>
            {errors.branchName.message}
          </Text>
        )}

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={style.textArea}
              placeholder="Enter Address"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />

        {errors.address && (
          <Text style={style.errorText}>
            {errors.address.message}
          </Text>
        )}

        <View style={style.buttonContainer}>
          <View style={style.buttonWrapper}>
            <Button
              onPress={handleSubmit(onSubmit)}
              title={
                isLoading
                  ? branch
                    ? 'Updating...'
                    : 'Saving...'
                  : branch
                    ? 'Update Branch'
                    : 'Save Branch'
              }
              disabled={isLoading}
            />
          </View>

          <View style={style.buttonWrapper}>
            <Button
              title="Cancel"
              color="#ff3b30"
              onPress={closeModal}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BranchregisterScreen;
