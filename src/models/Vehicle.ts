export class Vehicle {
    id: string;
    make: string;
    model: string;
    modelId: string;
    year: number;
    bodyStyle: string;
    mileage: number;
    fuelType: string;
    needsRepair: boolean;
    available: boolean;

    constructor(
        id: string,
        make: string,
        model: string,
        modelId: string,
        year: number,
        bodyStyle: string,
        mileage: number,
        fuelType: string,
        needsRepair: boolean,
        available: boolean
    ) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.modelId = modelId
        this.year = year;
        this.bodyStyle = bodyStyle;
        this.mileage = mileage;
        this.fuelType = fuelType;
        this.needsRepair = needsRepair;
        this.available = available;
    }
}