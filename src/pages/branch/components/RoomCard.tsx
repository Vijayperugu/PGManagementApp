import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { brachStyle } from '../../../styles/Branch'
import { BedDouble, DoorOpen, Layers, Pencil, Trash2, Users } from 'lucide-react-native'
import { Room } from '../types/room';

interface Props {
    room: Room;
    onEdit: (room: Room) => void;
    onDelete: (id: number) => void;
}

const RoomCard = ({room,onEdit,onDelete}:Props) => {

    return (

        <View style={brachStyle.branchCardContent}>
            <View style={brachStyle.iconBadge}>
                <BedDouble size={24} color="#e38144" />
            </View>

            <View style={brachStyle.branchInfo}>
                <Text style={brachStyle.cardTitle}>
                    Room {room.roomNumber}
                </Text>
                <View style={brachStyle.cardStat}>
                    <Layers size={14} color="#6B7280" />
                    <Text style={brachStyle.cardStatText}>
                        floor: {room.floor}
                    </Text>
                </View>
                <View style={brachStyle.cardStat}>
                    <Users size={14} color="#6B7280" />
                    <Text style={brachStyle.cardStatText}>
                        {room.occupied}/{room.capacity} Occupied
                    </Text>
                </View>
                <View style={brachStyle.cardStat}>
                    <DoorOpen size={14} color="#6B7280" />
                    <Text style={brachStyle.cardStatText}>
                        {room.availableBeds} Beds Available
                    </Text>
                </View>
                <View style={brachStyle.cardStat}>
                    <Layers size={14} color="#6B7280" />
                    <Text style={brachStyle.cardStatText}>
                        Capacity: {room.capacity}
                    </Text>
                </View>
                <View style={brachStyle.userDetailRow}>
                    <TouchableOpacity onPress={() => onEdit(room)} >
                        <View style={brachStyle.deleteBoxButton}>
                            <Pencil size={20} color="#007AFF" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete(room.id)} >
                        <View style={brachStyle.deleteBoxButton}>
                            <Trash2 size={20} color="#f50303" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default RoomCard