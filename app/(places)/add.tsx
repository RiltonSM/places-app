import { router, useLocalSearchParams } from 'expo-router';
import { PlaceForm } from '../../components/Places/PlaceForm';
import { Place } from '../../models/Place';
import { insertPlace } from '../../util/database';

export default function AddPlace() {
    const { pickedLat, pickedLng } = useLocalSearchParams()

    const createPlaceHandler = async (place: Place) => {
        await insertPlace(place)
        router.navigate('/(places)')
    }
    return(
        <PlaceForm lat={Number(pickedLat)} lng={Number(pickedLng)} onCreatePlace={createPlaceHandler}/>
    )
}