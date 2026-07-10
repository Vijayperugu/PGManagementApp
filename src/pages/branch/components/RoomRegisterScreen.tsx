import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { style } from '../../../styles/login';
import { roomSchema, RoomDataForm } from '../schemas/RoomSchema';
import { useCreateRoom, useUpdateRoom } from '../hooks/useCreateRoom';
import { Room } from '../types/room';

interface RoomRegisterProps {
  branchId: number;
  closeModal: () => void;
  room?: Room
}

const RoomRegisterScreen = ({ branchId, closeModal, room }: RoomRegisterProps) => {
  const createRoomMutation = useCreateRoom(branchId, closeModal);
  const updateRoomMutation = useUpdateRoom(branchId, closeModal);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<RoomDataForm>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomNumber: '',
      floor: '',
      capacity: '',
      rent: '',
    },
    mode: 'all',
  });


  useEffect(() => {
    if (room) {
      reset({
        roomNumber: String(room.roomNumber ?? ''),
        floor: String(room.floor ?? ''),
        capacity: String(room.capacity ?? ''),
        rent: String(room.rent ?? '')
      })
    } else {
      reset({
        roomNumber: '',
        floor: '',
        capacity: '',
        rent: ''
      })
    }
  }, [room, reset]);

  const onSubmit = (data: RoomDataForm) => {

  if(room){
    updateRoomMutation.mutate({
      id: room.id,
      data: {
        roomNumber: data.roomNumber,
        floor: Number(data.floor),
        capacity: Number(data.capacity),
        rent: Number(data.rent),
      },
    });
    return; 
  }


    createRoomMutation.mutate({
      roomNumber: data.roomNumber,
      floor: Number(data.floor),
      capacity: Number(data.capacity),
      rent: Number(data.rent),
    });
  };

  const isLoading = createRoomMutation.isPending || updateRoomMutation.isPending;
  return (
    <ScrollView
      contentContainerStyle={style.branchContainer}
      keyboardShouldPersistTaps="handled"


    >

      <Text style={style.title}>{room ? 'Edit Room' : 'Add New Room'}</Text>
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
             isLoading
                ? room
                  ? 'Updating...'
                  : 'Creating...'
                :room
                  ? 'Update Room'
                  : 'Create Room'
            }
            disabled={isLoading}
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
