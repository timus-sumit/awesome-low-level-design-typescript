import { ChangeDispenser } from "./changeDispenser";
import { MoneyDenomination } from "./enum";
import { Inventory } from "./inventory";
import { Item } from "./item";
import { ReservationQueue } from "./reservationQueue";
import { IdleState, State } from "./state";
import { TransactionSystem } from "./transactionSystem";

export class VendingMachine {
  inventory: Inventory;
  transaction = new TransactionSystem();
  dispenser = new ChangeDispenser();
  selectedCode: string = "";
  change = new Map<number, number>();
  currentState: State;
  queue = new ReservationQueue();

  constructor(items: Item[], qty: number[]) {
    this.inventory = new Inventory(items, qty);
    this.currentState = new IdleState(this);
  }

  addChange(denom: MoneyDenomination, qty: number) {
    this.dispenser.addChange(denom, qty);
  }

  selectItem(code: string) {
    this.queue.enqueue(() => {
      try {
        this.currentState.select(code);
      } catch (e) {
        console.error("Select error:", e);
      }
    });
  }

  insertMoney(money: number) {
    this.queue.enqueue(() => {
      try {
        this.currentState.insert(money);
      } catch (e) {
        console.error("Insert error:", e);
      }
    });
  }

  returnChange() {
    this.queue.enqueue(() => {
      try {
        this.currentState.returnChange();
      } catch (e) {
        console.error("Return error:", e);
      }
    });
  }

  dispense() {
    this.queue.enqueue(() => {
      try {
        this.currentState.dispense();
        console.log("Item dispensed.");
      } catch (e) {
        console.error("Dispense error:", e);
      }
    });
  }

  getAvailableItems() {
    return this.inventory.getAvailableItems();
  }
}
