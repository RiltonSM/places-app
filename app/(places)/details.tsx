import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { OutlineButton } from '../../components/UI/OutlineButton';
import { Colors } from '../../constants/colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { fetchPlaceById } from '../../util/database';
import { Place } from '../../models/Place';

export default function Details() {
    const [ place, setPlace ] = useState<Place>({
        id: '',
        title: '',
        imageUri: '',
        location: {lat: 0, lng: 0, address: ''}
    })
    const { placeId } = useLocalSearchParams()

    useEffect(() => {
        const getPlaceFromDatabase = async () => {
            const placeFetched = await fetchPlaceById(placeId as string)

            setPlace(placeFetched as Place)
        }

        if (placeId) getPlaceFromDatabase()
    }, [placeId])

    const showOnMapHandler = () => {
        console.log(place)
        router.push({ pathname: 'map', params: { location: JSON.stringify(place.location) } })
    }

    return (
        <ScrollView >
            {place.imageUri && <Image style={styles.image} source={{ uri: place.imageUri }}/>}
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.location.address}</Text>
                </View>
            </View>
            <OutlineButton icon="map" onPress={showOnMapHandler}>View on Map</OutlineButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        minHeight: 300,
        height: '35%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})