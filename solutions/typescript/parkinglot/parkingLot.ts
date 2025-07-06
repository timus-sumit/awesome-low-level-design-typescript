import { ParkingLevel } from "./parkingLevel";
import { ParkingSpot } from "./parkingSpot";
import { Vehicle } from "./vehicle";

export class ParkingLot {
  parkingLevels: ParkingLevel[] = [];

  constructor(levels: number, parkingLevelLimit: number) {
    for (let i = 0; i < levels; i++) {
      this.parkingLevels.push(new ParkingLevel(parkingLevelLimit));
    }
  }

  addSpot(level: number, spot: ParkingSpot) {
    this.parkingLevels[level].addSpot(spot);
  }

  checkAvailability(vehicle: Vehicle, callback: (result: { level: number | null, id: string | null }) => void) {
    let found = false;
    for (let i = 0; i < this.parkingLevels.length; i++) {
      const level = this.parkingLevels[i];
      level.reserveVehicleSpot(vehicle, ({ id }) => {
        if (!found && id) {
          found = true;
          callback({ level: i, id });
        }
      });
    }
    if (!found) {
      callback({ level: null, id: null });
    }
  }

  fillSpot(level: number, id: string, vehicle: Vehicle) {
    this.parkingLevels[level].fillSpot(id, vehicle);
  }

  releaseSpot(level: number, id: string) {
    this.parkingLevels[level].releaseSpot(id);
  }
}