import { useCallback, useState } from 'react';

import { PlacesList } from '../../components/Places/PlacesList';
import { Place } from '../../models/Place';
import { fetchPlaces } from '../../util/database';
import { useFocusEffect } from 'expo-router';

export default function AllPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([])

    useFocusEffect(
        useCallback(() => {
            const getPlacesFromDatabase = async () => {
                const placesFromDatabase = await fetchPlaces()
                const places = placesFromDatabase.map((place: any) => ({
                    ...place,
                    location: {
                        lat: place.lat,
                        lng: place.lng,
                        address: place.address
                    }
                }))
                setLoadedPlaces(places as Array<Place>)
            }
    
            getPlacesFromDatabase()
        }, [])
    )
    return <PlacesList places={loadedPlaces}/>
}