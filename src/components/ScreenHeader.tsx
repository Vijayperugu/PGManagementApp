import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
 
interface ScreenHeaderProps {
    title: string;
    canGoBack?: boolean;
    onBackPress?: () => void;
}
 
export default function ScreenHeader({ title, canGoBack = true, onBackPress }: ScreenHeaderProps) {
    const navigation = useNavigation();
 
    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
 

    return (
        <View style={styles.rowContainer} >
            <Pressable onPress={handleBack}>
                {canGoBack && <ArrowLeft size={20} strokeWidth={5} />}
            </Pressable >
            <Text style={styles.containerTitle}>{title}</Text>
        </View >
    );
}
 
const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 16,
    },
    containerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: "black",
    },
});
 