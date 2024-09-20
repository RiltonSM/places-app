import { Alert, Image, Text, View, StyleSheet } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react"
import { Colors } from "../../constants/colors"
import { OutlineButton } from "../UI/OutlineButton"

interface ImagePickerProps {
    onImageTaken: (imagePath: string) => void
}
export const ImagePicker = ({ onImageTaken }: ImagePickerProps) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [pickedImage, setPickedImage] = useState('')

    const verifyPermissions = async () => {
        if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
            base64: true
        })
        if(!image.canceled) {
            setPickedImage(image.assets[0].uri as string)
            onImageTaken(image.assets[0].uri as string)
        }

    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }}/>
        
    }
    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon="camera" onPress={takeImageHandler}>Take image</OutlineButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})