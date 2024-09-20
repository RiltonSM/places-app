import { FlatList, Text, StyleSheet, View } from "react-native"
import { PlaceItem } from "./PlaceItem"
import { Colors } from "../../constants/colors"
import { Place } from "../../models/Place"
import { router } from "expo-router"

interface PlacesListProps {
    places: Array<Place>
}

export const PlacesList = ({ places }: PlacesListProps) => {
    const onSelectPlaceHandler = (placeId: string) => {
        router.navigate({ pathname: '(places)/details', params: { placeId } })
    }
    
    if (places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }
    
    return (
        <FlatList
            style={styles.list}
            data={places}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelectPlaceHandler}/>}
            keyExtractor={(item) => item.id as string}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 24  
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})