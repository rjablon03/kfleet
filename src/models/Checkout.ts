export class Checkout {
    id: string
    userId: string
    vehicleId: string
    vehicleInfo: string[]
    startDate: Date
    endDate: Date
    miles: number
    carbonEstimate: string
    description: string
    checkedIn: boolean
    project?: string

    constructor(
        id: string,
        userId: string,
        vehicleId: string,
        vehicleInfo: string[],
        startDate: Date,
        endDate: Date,
        miles: number,
        carbonEstimate: string,
        description: string,
        checkedIn: boolean,
        project?: string
    ) {
        this.id = id,
        this.userId = userId
        this.vehicleId = vehicleId
        this.vehicleInfo = vehicleInfo
        this.startDate = startDate
        this.endDate = endDate
        this.miles = miles
        this.carbonEstimate = carbonEstimate;
        this.description = description
        this.checkedIn = checkedIn
        this.project = project;
    }
}