import { GeoPoint, DocumentData } from "firebase/firestore";

export class Project {
    id: string;
    customerName: string;
    location: GeoPoint;

    constructor(id: string, customerName: string, location: GeoPoint) {
        this.id = id;
        this.customerName = customerName;
        this.location = location;
    }
}