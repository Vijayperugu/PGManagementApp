import React from 'react';
import {View,Text,Button,ScrollView,TextInput} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { style } from '../../../styles/login';
import {roomSchema,RoomDataForm} from '../schemas/RoomSchema';
import { useCreateRoom } from '../hooks/useCreateRoom';

interface RoomRegisterProps {
  branchId: number;
  closeModal: () => void;
}

const RoomRegisterScreen = ({branchId,closeModal}: RoomRegisterProps) => {
  const createRoomMutation = useCreateRoom(branchId,closeModal,
  );

  const {control,handleSubmit,formState: { errors }} = useForm<RoomDataForm>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomNumber: '',
      floor: '',
      capacity: '',
      rent: '',
    },
    mode: 'all',
  });

  const onSubmit = (data: RoomDataForm) => {
    createRoomMutation.mutate({
      roomNumber: data.roomNumber,
      floor: Number(data.floor),
      capacity: Number(data.capacity),
      rent: Number(data.rent),
    });
  };

  return (
    <ScrollView
      contentContainerStyle={style.branchContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Controller
          control={control}
          name="roomNumber"
          render={({ field }) => (
            <TextInput
              style={style.input}
              placeholder="Room Number"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.roomNumber && (
          <Text style={style.errorText}>
            {errors.roomNumber.message}
          </Text>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="floor"
          render={({ field }) => (
            <TextInput
              style={style.input}
              placeholder="Floor"
              keyboardType="numeric"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.floor && (
          <Text style={style.errorText}>
            {errors.floor.message}
          </Text>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="capacity"
          render={({ field }) => (
            <TextInput
              style={style.input}
              placeholder="Capacity"
              keyboardType="numeric"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.capacity && (
          <Text style={style.errorText}>
            {errors.capacity.message}
          </Text>
        )}
      </View>

      <View>
        <Controller
          control={control}
          name="rent"
          render={({ field }) => (
            <TextInput
              style={style.input}
              placeholder="Monthly Rent"
              keyboardType="numeric"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.rent && (
          <Text style={style.errorText}>
            {errors.rent.message}
          </Text>
        )}
      </View>

      <View style={style.buttonContainer}>
        <View style={style.buttonWrapper}>
          <Button
            title={
              createRoomMutation.isPending
                ? 'Saving...'
                : 'Register Room'
            }
            disabled={createRoomMutation.isPending}
            onPress={handleSubmit(onSubmit)}
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
  );
};

export default RoomRegisterScreen;