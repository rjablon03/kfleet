export class Checkout {
    id: string
    userId: string
    vehicleId: string
    startDate: Date
    endDate: Date
    miles: number
    description: string
    project?: string

    constructor(
        id: string,
        userId: string,
        vehicleId: string,
        startDate: Date,
        endDate: Date,
        miles: number,
        description: string,
        project?: string,
    ) {
        this.id = id,
        this.userId = userId
        this.vehicleId = vehicleId
        this.startDate = startDate
        this.endDate = endDate
        this.miles = miles
        this.description = description
        this.project = project
    }
}