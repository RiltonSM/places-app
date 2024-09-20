import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { ImagePicker } from './ImagePicker';
import { Location, LocationPicker } from './LocationPicker';
import { Button } from '../UI/Button';
import { Place } from '../../models/Place';

interface LocationWithAddress extends Location {
    address: string
}

interface PlaceFormProps extends Location {
    onCreatePlace: (place: Place) => void
}
export const PlaceForm = ({ lat, lng, onCreatePlace }: PlaceFormProps) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [pickedLocation, setPickedLocation] = useState<LocationWithAddress | null>(null);

    const changeTitleHandler = (text: string) => {
        setEnteredTitle(text);
    }

    const takeImageHandler = useCallback((imageUri: string) => {
        setSelectedImage(imageUri);
    }, [])

    const pickLocationHandler = useCallback((location: LocationWithAddress) => {
        setPickedLocation(location);
    }, [])

    const savePlaceHandler = useCallback(async () => {
        if (!enteredTitle || !selectedImage || !pickedLocation) {
            Alert.alert('Missing information', 'Please provide a title, an image and a location')
            return
        }

        try {
            const placeData = new Place(enteredTitle, selectedImage, {
                lat: Number(pickedLocation.lat),
                lng: Number(pickedLocation.lng),
                address: pickedLocation.address
            })

            onCreatePlace(placeData)
        } catch (error) {
            console.log(error)
        }
    }, [selectedImage, enteredTitle, pickedLocation])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            
                <ImagePicker onImageTaken={takeImageHandler}/>

                <LocationPicker lat={lat} lng={lng} onPickLocation={pickLocationHandler}/>

                <Button onPress={savePlaceHandler}>Add Place</Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        marginBottom: 4,
        fontWeight: 'bold',
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})