import axios from "axios";

export const getLocation = (lat: number, lon: number) => {
    const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lon}
&key=${process.env.EXPO_PUBLIC_MAP_API_KEY}`;
    return imagePreview
}

export const getAddress = async (lat: number, lon: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.EXPO_PUBLIC_MAP_API_KEY}`
    const response = await axios.get(url)

    return response.data.results[0].formatted_address
}