import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { IconButton } from "../../components/UI/IconButton";
import { Colors } from "../../constants/colors";
import { init } from "../../util/database";

export default function PlacesLayout() {
    const [dbInitialized, setDbInitialized] = useState(false);
    
    useEffect(() => {
        init().then(async () => {
            setDbInitialized(true)
            await SplashScreen.hideAsync();
        }).catch(err => console.log(err));
    }, []);


    if (!dbInitialized) {
        SplashScreen.preventAutoHideAsync();
    }

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary500
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
                backgroundColor: Colors.gray700
            }
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Your Favorite Places",

                    headerRight: ({ tintColor }) => {
                        return (
                            <IconButton icon="add" size={24} color={tintColor} onPress={() => router.navigate('(places)/add')}/>
                        ) 
                    }
                 }}
            />
            <Stack.Screen
                name="add"
                options={{ 
                    title: "Add a new Place"
                }}
            />
            <Stack.Screen
                name="details"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="map"
            />
        </Stack>
    )
}