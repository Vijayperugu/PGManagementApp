import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { brachStyle } from '../../../styles/Branch';
import { Building2, DoorOpen, Layers, PencilLine, Trash2 } from 'lucide-react-native';
import { BranchType } from '../types/branch';


interface Props {
    branch: BranchType;
    onEdit: (branch: BranchType) => void;
    onDelete: (id: number) => void;

}

const BranchCard = ({ branch, onEdit, onDelete }: Props) => {
    return (
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
                    <TouchableOpacity onPress={(event) => {
                        event.stopPropagation();
                        onDelete(branch.id);
                    }} >
                        <View style={brachStyle.deleteBoxButton}>
                            <Trash2 size={25} color="#f50303" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(event) => {
                        event.stopPropagation();
                        onEdit(branch);
                    }} >
                        <View style={brachStyle.deleteBoxButton}>
                            <PencilLine size={25} color="#03f564" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BranchCard