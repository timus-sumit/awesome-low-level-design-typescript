import { VendingMachine } from "./vendingMachine";

export abstract class State {
  constructor(public vm: VendingMachine) {}
  abstract select(code: string): void;
  abstract insert(money: number): void;
  abstract returnChange(): void;
  abstract dispense(): void;
}

export class IdleState extends State {
  select(code: string) {
    if (this.vm.inventory.checkStock(code) <= 0)
      throw new Error("Out of stock");
    this.vm.selectedCode = code;
    this.vm.currentState = new AfterSelectState(this.vm);
  }
  insert() {
    throw new Error("Select item first");
  }
  returnChange() {
    throw new Error("No money to return");
  }
  dispense() {
    throw new Error("Invalid operation");
  }
}

export class AfterSelectState extends State {
  select() {
    throw new Error("Already selected");
  }
  insert(money: number) {
    const item = this.vm.inventory.getItemByCode(this.vm.selectedCode);
    if (money < item.price) throw new Error("Insufficient money");
    this.vm.transaction.add(money);
    const changeAmt = money - item.price;
    this.vm.change = this.vm.dispenser.calculateChange(changeAmt);
    this.vm.currentState = new AfterCollectMoneyState(this.vm);
  }
  returnChange() {
    throw new Error("Insert money first");
  }
  dispense() {
    throw new Error("Insert money first");
  }
}

export class AfterCollectMoneyState extends State {
  select() {
    throw new Error("Wait...");
  }
  insert() {
    throw new Error("Wait...");
  }
  returnChange() {
    this.vm.dispenser.applyChange(this.vm.change);
    this.vm.transaction.deduct(
      this.vm.inventory.getItemPrice(this.vm.selectedCode)
    );
    this.vm.currentState = new AfterReturnChangeState(this.vm);
  }
  dispense() {
    throw new Error("Return change first");
  }
}

export class AfterReturnChangeState extends State {
  select() {
    throw new Error("Dispensing in progress");
  }
  insert() {
    throw new Error("Dispensing in progress");
  }
  returnChange() {
    throw new Error("Already returned");
  }
  dispense() {
    this.vm.inventory.reduceStock(this.vm.selectedCode);
    this.vm.transaction.reset();
    this.vm.currentState = new IdleState(this.vm);
  }
}
