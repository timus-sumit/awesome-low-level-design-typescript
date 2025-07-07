import { Item } from "./item";

export class Inventory {
  itemMap: Map<string, Item> = new Map();
  stockMap: Map<string, number> = new Map();

  constructor(items: Item[], quantity: number[]) {
    items.forEach((item, idx) => {
      this.itemMap.set(item.code, item);
      this.stockMap.set(item.code, quantity[idx] ?? 0);
    });
  }

  getItemByCode(code: string): Item {
    const item = this.itemMap.get(code);
    if (!item) throw new Error("Item not found");
    return item;
  }

  getItemPrice(code: string): number {
    return this.getItemByCode(code).price;
  }

  restockItem(code: string, qty: number) {
    const current = this.stockMap.get(code) ?? 0;
    this.stockMap.set(code, current + qty);
  }

  reduceStock(code: string) {
    const current = this.stockMap.get(code) ?? 0;
    if (current <= 0) throw new Error("Out of stock");
    this.stockMap.set(code, current - 1);
  }

  checkStock(code: string) {
    return this.stockMap.get(code) ?? 0;
  }

  getAvailableItems(): {
    code: string;
    name: string;
    price: number;
    stock: number;
  }[] {
    return Array.from(this.itemMap.values()).map((item) => ({
      code: item.code,
      name: item.name,
      price: item.price,
      stock: this.stockMap.get(item.code) ?? 0,
    }));
  }
}
