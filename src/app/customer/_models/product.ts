export class Product {
    constructor(
      public product_id: string,
      public category_id: string,
      public name: string,
      public description: string,
      public qty: number,
      public price: number,
      public seller_id: string,
      public status: "active" | "inactive" | "pending" | "outStock",
      public pics: string[] = [],
      public reviews: { customer_id: string; rate: number; comment?: string }[] = []
    ) {}
  }