import React from 'react';
import {Modal,View,TouchableWithoutFeedback} from 'react-native';
import { brachStyle } from '../../../styles/Branch';

interface Props {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    sheetStyle?: object;
}

const BottomSheetModal = ({
    visible,
    onClose,
    children,
    sheetStyle,
}: Props) => {

    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={brachStyle.modalOverlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={brachStyle.modalDismissArea}/>
                </TouchableWithoutFeedback>
                <View style={[brachStyle.modalSheet,sheetStyle,]}>
                    {children}
                </View>
            </View>
        </Modal>

    );

};

export default BottomSheetModal;