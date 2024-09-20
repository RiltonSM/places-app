import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from '../../components/UI/IconButton';

interface Location {
    lat: number | null
    lng: number | null
}

type RegionProps ={
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
} | undefined

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState<Location>({
        lat: null,
        lng: null
    })
    const [region, setRegion] = useState<RegionProps>(undefined);

    const { setOptions } = useNavigation()
    const { location } = useLocalSearchParams()

    const savePickedLocationHandler = () => {
        if (selectedLocation.lat === null || selectedLocation.lng === null) {
            Alert.alert('No Location Picked', 'Please pick a location on the map')
            
            return
        }
        router.navigate({ pathname: '(places)/add', params: {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        }})
    }

    useLayoutEffect(() => {
        setOptions({
            headerRight: ({ tintColor }: any) => {
                return location ? null : <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
            }
        })
    }, [savePickedLocationHandler])

    useEffect(() => {
        const { lat, lng } = JSON.parse(location as string)
        console.log(+lat, +lng)
        if (lat && lng) {
            setRegion({
                latitude: +lat,
                longitude: +lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })

            setSelectedLocation({ lat: +lat, lng: +lng })
        } else {
            setRegion({
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }, [location])

    const selectLocationHandler = useCallback((event: any) => {
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({ lat, lng })
    }, [])

    return (
        <MapView 
            style={styles.map} 
            initialRegion={region}
            onPress={selectLocationHandler}
        >
           {(selectedLocation.lat && selectedLocation.lng) && 
            <Marker
                title="Picked Location"
                coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                }}
            />}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})