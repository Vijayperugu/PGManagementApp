import React, { useState } from 'react';
import {View,Text,ScrollView,TouchableOpacity,Platform,TextInput,Button} from 'react-native';
import { Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { pickPhotoFromLibrary } from '../../../utils/photoPicker';
import { style } from '../../../styles/login';
import {UserSchema,UserDataForm} from '../schemas/UserSchema';
import { useCreateMember } from '../hooks/useCreateMember';
interface AddUserProps {
    roomId: number;
    closeModal: () => void;
}

const AddUserScreen = ({roomId,closeModal}: AddUserProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const createMemberMutation = useCreateMember(
        roomId,
        closeModal,
    );
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<UserDataForm>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: '',
            age: '',
            gender: 'MALE',
            phone: '',
            occupation: '',
            address: '',
            joiningDate: '',
            photoUri: ''
        },
        mode: 'all',
    });
    const joiningDate = watch('joiningDate');
    const photoUri = watch('photoUri');
    const handleDateChange = (_event: DateTimePickerEvent, selectedDate?: Date,) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setValue(
                'joiningDate',
                selectedDate.toISOString().split('T')[0],
                {
                    shouldValidate: true,
                    shouldDirty: true,
                },
            );
        }
    };

    const handlePhotoPick = async () => {
        const selectedPhoto = await pickPhotoFromLibrary();
        if (selectedPhoto) {
            setValue('photoUri', selectedPhoto, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    const onSubmit = (data: UserDataForm) => {
        createMemberMutation.mutate({
            name: data.name,
            age: Number(data.age),
            gender: data.gender,
            phone: data.phone,
            occupation: data.occupation,
            address: data.address,
            joiningDate: data.joiningDate,
        });
    };

    return (
        <ScrollView contentContainerStyle={style.branchContainer} keyboardShouldPersistTaps="handled">
            <TouchableOpacity style={style.photoPicker} onPress={handlePhotoPick}>
                {photoUri ? (
                    <Image
                        source={{ uri: photoUri }}
                        style={style.photoPreview}
                    />
                ) : (
                    <Text style={style.photoPickerText}>
                        Upload Photo
                    </Text>
                )}
            </TouchableOpacity>
            {/* Name */}

            <Controller
                control={control}
                name="name"
                render={({ field }) => (
                    <TextInput
                        style={style.input}
                        placeholder="Enter Name"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                    />
                )}
            />

            {errors.name && (
                <Text style={style.errorText}>
                    {errors.name.message}
                </Text>
            )}

            {/* Age */}

            <Controller
                control={control}
                name="age"
                render={({ field }) => (
                    <TextInput
                        style={style.input}
                        placeholder="Enter Age"
                        keyboardType="numeric"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                    />
                )}
            />

            {errors.age && (
                <Text style={style.errorText}>
                    {errors.age.message}
                </Text>
            )}

            {/* Phone */}

            <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                    <TextInput
                        style={style.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                    />
                )}
            />

            {errors.phone && (
                <Text style={style.errorText}>
                    {errors.phone.message}
                </Text>
            )}

            {/* Occupation */}

            <Controller
                control={control}
                name="occupation"
                render={({ field }) => (
                    <TextInput
                        style={style.input}
                        placeholder="Occupation"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                    />
                )}
            />

            {errors.occupation && (
                <Text style={style.errorText}>
                    {errors.occupation.message}
                </Text>
            )}

            {/* Gender */}

            <Text style={{ marginBottom: 8 }}>
                Gender
            </Text>

            <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}
                    >
                        {['MALE', 'FEMALE', 'OTHER'].map(
                            gender => (
                                <TouchableOpacity
                                    key={gender}
                                    style={{
                                        padding: 10,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        backgroundColor:
                                            field.value === gender
                                                ? '#2563EB'
                                                : '#FFFFFF',
                                    }}
                                    onPress={() =>
                                        field.onChange(gender)
                                    }
                                >
                                    <Text
                                        style={{
                                            color:
                                                field.value === gender
                                                    ? '#FFFFFF'
                                                    : '#000000',
                                        }}
                                    >
                                        {gender}
                                    </Text>
                                </TouchableOpacity>
                            ),
                        )}
                    </View>
                )}
            />

            {errors.gender && (
                <Text style={style.errorText}>
                    {errors.gender.message}
                </Text>
            )}

            {/* Joining Date */}

            <TouchableOpacity
                style={style.dateInput}
                onPress={() => setShowDatePicker(true)}
            >
                <Text
                    style={
                        joiningDate
                            ? style.dateText
                            : style.placeholderText
                    }
                >
                    {joiningDate ||
                        'Select Joining Date'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={
                        joiningDate
                            ? new Date(joiningDate)
                            : new Date()
                    }
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleDateChange}
                />
            )}

            {errors.joiningDate && (
                <Text style={style.errorText}>
                    {errors.joiningDate.message}
                </Text>
            )}

            {/* Address */}

            <Controller
                control={control}
                name="address"
                render={({ field }) => (
                    <TextInput
                        style={style.textArea}
                        placeholder="Address"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
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
                        title={
                            createMemberMutation.isPending
                                ? 'Saving...'
                                : 'Register Member'
                        }
                        disabled={
                            createMemberMutation.isPending
                        }
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

export default AddUserScreen;