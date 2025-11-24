export class InventoryItem  {
  itemName: string;
  categoryID?: number;
  categoryName?: string;
  units?: string;
  quantity: number;
  lowThreshold: number;
  color?: string;

  constructor (itemName: string, categoryID?: number, categoryName?: string, units?: string, quantity: number, lowThreshold: number, color?: string) {
    this.itemName = itemName;
    this.categoryID = categoryID;
    this.categoryName = categoryName;
    this.units = units;
    this.quantity = quantity;
    this.lowThreshold = lowThreshold;
    this.color = color;
  }
};