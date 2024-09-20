import { View, Image, Text, Pressable, StyleSheet } from "react-native"
import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

interface PlaceItemProps {
    place: Place;
    onSelect: (placeId: string) => void
}

export const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
    return (
        <Pressable onPress={() => onSelect(place.id as string)} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <Image style={styles.image} source={{ uri: place.imageUri }} onError={() => console.log('oi')}/>

            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.location.address}</Text>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: 'white'
    },
    imageTest: {
        width: '100%',
        height: '100%'
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
})