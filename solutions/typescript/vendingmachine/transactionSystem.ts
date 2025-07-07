export class TransactionSystem {
  constructor(public balance: number = 0) {}

  add(val: number) {
    this.balance += val;
  }

  deduct(val: number) {
    if (this.balance < val) throw new Error("Insufficient balance");
    this.balance -= val;
  }

  reset() {
    this.balance = 0;
  }
}
