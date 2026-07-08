import React, { useContext } from 'react';
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
import PgContext from '../../../context/PgContext';
import { useCreateBranch } from '../hooks/useCreateBranch';
import { BranchRequest } from '../types/branch';

interface BranchRegisterProps {
  closeModal: () => void;
}

const BranchregisterScreen = ({ closeModal }: BranchRegisterProps) => {
  const createBranchMutation = useCreateBranch()
  const { control, handleSubmit, formState: { errors } } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branchName: '',
      address: '',
    },
    mode: 'all',
  });

  const onSubmit = (data: BranchFormData) => {

    const requestData = {
      name: data.branchName,
      address: data.address
    }
    createBranchMutation.mutate(requestData)
    closeModal();
  };

  return (
    <View style={style.screen}>
      <ScrollView
        contentContainerStyle={style.branchContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={style.title}>Add New Branch</Text>

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
                createBranchMutation.isPending
                  ? "Saving..."
                  : "Save"
              }
              disabled={createBranchMutation.isPending}
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
