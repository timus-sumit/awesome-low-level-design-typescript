import { Vehicle } from "./vehicle";

export class ParkingSpot {
  vehicle: Vehicle | null = null;
  private reserved: boolean = false;

  constructor(public id: string, public vehicleType: VehicleType) {}

  reserveSpot(): boolean {
    if (!this.checkAvailability()) return false;
    this.reserved = true;
    return true;
  }

  fillSpot(vehicle: Vehicle): string {
    this.vehicle = vehicle;
    this.reserved = false;
    return this.id;
  }

  releaseSpot(): void {
    this.vehicle = null;
    this.reserved = false;
  }

  checkAvailability() {
    return this.vehicle === null && !this.reserved;
  }
}

class CarParkingSpot extends ParkingSpot {
  constructor(id: string) {
    super(id, VehicleType.CAR);
  }
}

class BikeParkingSpot extends ParkingSpot {
  constructor(id: string) {
    super(id, VehicleType.BIKE);
  }
}

class TruckParkingSpot extends ParkingSpot {
  constructor(id: string) {
    super(id, VehicleType.TRUCK);
  }
}

abstract class ParkingSpotFactory {
  abstract getInstance(id: string): ParkingSpot;
}

export class CarParkingSpotFactory extends ParkingSpotFactory {
  getInstance(id: string): ParkingSpot {
    return new CarParkingSpot(id);
  }
}

export class BikeParkingSpotFactory extends ParkingSpotFactory {
  getInstance(id: string): ParkingSpot {
    return new BikeParkingSpot(id);
  }
}

export class TruckParkingSpotFactory extends ParkingSpotFactory {
  getInstance(id: string): ParkingSpot {
    return new TruckParkingSpot(id);
  }
}