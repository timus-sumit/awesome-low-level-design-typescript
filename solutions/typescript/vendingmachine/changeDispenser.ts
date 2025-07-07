import { MoneyDenomination } from "./enum";

export class ChangeDispenser {
  private changeMap: Map<number, number> = new Map();

  addChange(denomination: MoneyDenomination, quantity: number) {
    const current = this.changeMap.get(denomination) || 0;
    this.changeMap.set(denomination, current + quantity);
  }

  removeChange(denomination: MoneyDenomination, quantity: number) {
    const current = this.changeMap.get(denomination) || 0;
    if (quantity > current)
      throw new Error("Insufficient change of this denomination.");
    this.changeMap.set(denomination, current - quantity);
  }

  calculateChange(amount: number): Map<number, number> {
    const result = new Map<number, number>();
    const denominations = Array.from(this.changeMap.keys()).sort(
      (a, b) => b - a
    );

    for (const denom of denominations) {
      const available = this.changeMap.get(denom)!;
      let needed = Math.floor(amount / denom);
      if (needed > 0) {
        const used = Math.min(available, needed);
        if (used > 0) {
          result.set(denom, used);
          amount -= used * denom;
        }
      }
    }

    if (amount > 0) throw new Error("Cannot return exact change");
    return result;
  }

  applyChange(changeMap: Map<number, number>) {
    for (const [denom, qty] of changeMap.entries()) {
      this.removeChange(denom, qty);
    }
  }
}
