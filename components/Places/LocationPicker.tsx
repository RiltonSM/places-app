import { useEffect, useState } from "react"
import { View, StyleSheet, Alert, Text, Image } from "react-native"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

import { OutlineButton } from "../UI/OutlineButton"
import { Colors } from "../../constants/colors"
import { getAddress, getLocation } from "../../util/location"
import { router } from "expo-router"


export type Location =  {
    lat?: number
    lng?: number
}

interface LocationPickerProps extends Location{
    onPickLocation: (location: Location & {address: string}) => void
}


export const LocationPicker = ({ lat, lng, onPickLocation }: LocationPickerProps) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [imagePreview, setImagePreview] = useState<string>('')
    const [location, setLocation] = useState<Location>({})

    useEffect(() => {
        if(lat && lng) {
            const mapImageUri = getLocation(lat, lng)
            setLocation({ lat, lng })
            setImagePreview(mapImageUri)
        }
    }, [lat, lng])

    useEffect(() => {
        const handleLocation = async () => {
            
            if(location.lat && location.lng) {
                const address = await getAddress(location.lat, location.lng)
                onPickLocation({...location, address})
            }
        }

        handleLocation()
    }, [location])

    const verifyPermissions = async () => {
        if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app')
            return false
        }

        return true
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        const location = await getCurrentPositionAsync()
        const mapImageUri = getLocation(location.coords.latitude, location.coords.longitude)

        setImagePreview(mapImageUri)
        setLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
    }

    const pickOnMapHandler = () => {
        router.push('/(places)/map')
    }

    let mapPreview = <Text>No Location picked yet!</Text>

    if(imagePreview) {
        mapPreview = <Image style={styles.mapPreviewImage} source={{ uri: imagePreview }} />
    }
    
    return (
        <View>
            <View style={styles.mapPreview}>
                {mapPreview}
            </View>

            <View style={styles.actions}>
                <OutlineButton icon='location' onPress={getLocationHandler}>Locate User</OutlineButton>
                <OutlineButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})