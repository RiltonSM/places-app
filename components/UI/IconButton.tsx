import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'

interface IconButtonProps {
    icon: any
    size: number
    color: string | undefined
    onPress: () => void
}

export const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.7
    }
})