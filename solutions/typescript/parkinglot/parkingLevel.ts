import { ParkingSpot } from "./parkingSpot";
import { ReservationQueue } from "./reservationQueue";
import { Vehicle } from "./vehicle";

export class ParkingLevel {
  parkingSpots: Map<string, ParkingSpot> = new Map();
  limit: number;
  reservationQueue = new ReservationQueue();

  constructor(limit: number) {
    this.limit = limit;
  }

  addSpot(spot: ParkingSpot) {
    if (this.parkingSpots.size === this.limit) {
      throw new Error("Parking level is full.");
    }
    this.parkingSpots.set(spot.id, spot);
  }

  checkAvailability(vehicleType: VehicleType) {
    for (let spot of this.parkingSpots.values()) {
      if (spot.vehicleType === vehicleType && spot.checkAvailability()) {
        if (spot.reserveSpot()) return spot.id;
      }
    }
    return null;
  }

  fillSpot(id: string, vehicle: Vehicle) {
    const spot = this.parkingSpots.get(id);
    if (!spot) throw new Error("Spot not found");
    spot.fillSpot(vehicle);
  }

  releaseSpot(id: string) {
    const spot = this.parkingSpots.get(id);
    if (!spot) throw new Error("Spot not found");
    spot.releaseSpot();
  }

  reserveVehicleSpot(vehicle: Vehicle, callback: (result: { id: string | null }) => void) {
    this.reservationQueue.enqueue(() => {
      const id = this.checkAvailability(vehicle.vehicleType);
      callback({ id });
    });
  }
}