import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserDataForm, UserSchema } from '../schemas/UserSchema'
import { style } from '../../../styles/login'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import PgContext from '../../../context/PgContext'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { pickPhotoFromLibrary } from '../../../utils/photoPicker'

interface AddUserProps {
    roomId: number;
    closeModal: () => void;
}
const AddUserScreen = ({roomId, closeModal }: AddUserProps) => {
    const { addMember } = useContext(PgContext);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserDataForm>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: '',
            age: '',
            PhoneNumber: '',
            Address: '',
            occupation: '',
            joiningDate: '',
            photoUri: '',
        },
        mode: 'all'
    })
    const joiningDate = watch('joiningDate');
    const photoUri = watch('photoUri');

    const onSubmit = (data: UserDataForm) => {
        addMember(roomId, data)
        closeModal()
    }

    const handleDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            setValue('joiningDate', selectedDate.toISOString().split('T')[0], {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    const handlePhotoPick = async () => {
        const selectedPhotoUri = await pickPhotoFromLibrary();
        if (selectedPhotoUri) {
            setValue('photoUri', selectedPhotoUri, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    return (
        <ScrollView
            contentContainerStyle={style.branchContainer}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={style.formTitle}>Add User</Text>
            <TouchableOpacity style={style.photoPicker} onPress={handlePhotoPick}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={style.photoPreview} />
                ) : (
                    <Text style={style.photoPickerText}>Upload Photo</Text>
                )}
            </TouchableOpacity>
            {errors.photoUri && <Text style={style.errorText}>{errors.photoUri.message}</Text>}

            <View>
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={style.input}
                            placeholder="Enter name"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && <Text style={style.errorText}>{errors.name.message}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name='age'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={style.input}
                            placeholder="Enter Age"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.age && <Text style={style.errorText}>{errors.age.message}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name='PhoneNumber'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={style.input}
                            placeholder="Enter Phone Number"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.PhoneNumber && <Text style={style.errorText}>{errors.PhoneNumber.message}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name='occupation'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={style.input}
                            placeholder="Enter Occupation"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.occupation && <Text style={style.errorText}>{errors.occupation.message}</Text>}
            </View>
            <View>
                <TouchableOpacity style={style.dateInput} onPress={() => setShowDatePicker(true)}>
                    <Text style={joiningDate ? style.dateText : style.placeholderText}>
                        {joiningDate || 'Select Joining Date'}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={joiningDate ? new Date(joiningDate) : new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={handleDateChange}
                    />
                )}
                {errors.joiningDate && <Text style={style.errorText}>{errors.joiningDate.message}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name='Address'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={[style.textArea]}
                            placeholder="Enter Address"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    )}
                />
                {errors.Address && <Text style={style.errorText}>{errors.Address.message}</Text>}
            </View>
            <View style={style.buttonContainer}>
                <View style={style.buttonWrapper}>
                    <Button
                        title='Register User'
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
    )
}

export default AddUserScreen
