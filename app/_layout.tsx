import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "(places)/add",
};

export default function RootLayout() {
    return (
        <Stack initialRouteName="(places)/add">
            <Stack.Screen
                name="(places)"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}