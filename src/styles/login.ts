import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 24
    },
    cardContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        padding: 24,
        borderColor: "black",
        borderWidth: 1

    },
    branchContainer:{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding:24,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
        textAlign: 'center',
    },
    photoPicker: {
        height: 112,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderStyle: 'dashed',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        marginBottom: 10,
        overflow: 'hidden',
    },
    photoPreview: {
        width: '100%',
        height: '100%',
    },
    photoPickerText: {
        color: '#2563eb',
        fontSize: 15,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#212529',
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
    textArea: {
        height: 100,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#212529',
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
    dateInput: {
        height: 48,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
    dateText: {
        fontSize: 16,
        color: '#212529',
    },
    placeholderText: {
        fontSize: 16,
        color: '#6c757d',
    },
    button: {
        height: 48,
        backgroundColor: 'blue',
        borderColor: '#444647',
        borderRadius: 8,
        marginTop: 8,
    },

    createBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 12
    },
    errorText: {
        color: '#DC3545',
        fontSize: 12,
        fontWeight: '500',
        marginBottom:6
    },
    buttonContainer: {
        marginTop: 15, 
    },
    buttonWrapper: {
        marginBottom: 12, 
    }
})
