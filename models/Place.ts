export class Place {
    id: string | undefined;
    title: string;
    imageUri: string;
    location: {lat: number, lng: number, address: string};
    constructor (title: string, imageUri: string,  location: {lat: number, lng: number, address: string}, id?: string) {
        this.title = title;
        this.imageUri = imageUri;
        this.location = location;
        this.id = id;
    }
}