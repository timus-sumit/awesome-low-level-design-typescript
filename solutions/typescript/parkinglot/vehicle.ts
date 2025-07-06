export class Vehicle {
  constructor(
    public registrationNumber: string,
    public vehicleType: VehicleType,
    public ownerName?: string
  ) {}
}