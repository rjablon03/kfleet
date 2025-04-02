export class Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    bodyStyle: string;
    mileage: number;
    milesPerYear: number;
    fuelType: string;
    needsRepair: boolean;
    available: boolean;

    constructor(
        id: string,
        make: string,
        model: string,
        year: number,
        bodyStyle: string,
        mileage: number,
        milesPerYear: number,
        fuelType: string,
        needsRepair: boolean,
        available: boolean
    ) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.bodyStyle = bodyStyle;
        this.mileage = mileage;
        this.milesPerYear = milesPerYear;
        this.fuelType = fuelType;
        this.needsRepair = needsRepair;
        this.available = available;
    }
}