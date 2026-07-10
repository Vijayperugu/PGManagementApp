import React from 'react';
import {View,Text,TouchableOpacity,} from 'react-native';
import {Phone,Briefcase,CalendarDays,MapPin,Pencil,Trash2} from 'lucide-react-native';
import { brachStyle } from '../../../styles/Branch';
import { Member } from '../types/members';

interface Props {
    member: Member;
    onEdit: (member: Member) => void;
    onDelete: (id: number) => void;
}

const MemberCard = ({member,onEdit,onDelete}: Props) => {

    return (
        <View style={brachStyle.userCard}>
            <View style={brachStyle.userInfo}>
                <Text style={brachStyle.userName}>
                    {member.name}
                </Text>
                <Text style={brachStyle.userMeta}>
                    Age {member.age} • {member.gender}
                </Text>
                <View style={brachStyle.userDetailRow}>
                    <Phone size={15} color="#4B5563"/>
                    <Text style={brachStyle.userDetailText}>
                        {member.phone}
                    </Text>
                </View>

                <View style={brachStyle.userDetailRow}>
                    <Briefcase size={15} color="#4B5563"/>
                    <Text style={brachStyle.userDetailText}>
                        {member.occupation}
                    </Text>
                </View>

                <View style={brachStyle.userDetailRow}>
                    <CalendarDays size={15} color="#4B5563"/>
                    <Text style={brachStyle.userDetailText}>
                        Joined {member.joiningDate}
                    </Text>
                </View>

                <View style={brachStyle.userDetailRow}>
                    <MapPin size={15} color="#4B5563"/>
                    <Text style={brachStyle.userDetailText}>
                        {member.address}
                    </Text>
                </View>
                <View style={brachStyle.userDetailRow}>
                    <TouchableOpacity onPress={() => onEdit(member)} >
                        <View style={brachStyle.deleteBoxButton}><Pencil size={20} color="#007AFF"/></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete(member.id)}>
                        <View style={brachStyle.deleteBoxButton}>
                            <Trash2 size={20} color="#ff0000"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default MemberCard;