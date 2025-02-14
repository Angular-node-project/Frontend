export class Product {
    constructor(
      public product_id: string,
      public categories: {category_id:string,name:string}[],
      public name: string,
      public description: string,
      public qty: number,
      public price: number,
      public seller_id: string,
      public seller:{seller_id:number,name:string},
      public status: "active" | "inactive" | "pending" | "outStock"|"deleted",
      public pics: string[] = [],
      public reviews: { customer: {customer_id: string,name:string}, rate: number; comment?: string ,created_at:Date}[] = [],
      public doesCustomerOrderThisProduct:boolean
    ) {}
  }
export class CashierProduct {
    constructor(
      public product_id: string,
      public categories: {category_id:string,name:string}[],
      public name: string,
      public description: string,
      public stock: number,
      public qty: number=1,
      public price: number,
      public seller_id: string,
      public seller:{seller_id:number,name:string},
      public status: "active" | "inactive" | "pending" | "outStock"|"deleted",
      public pics: string[] = [],
      public reviews: { customer: {customer_id: string,name:string}, rate: number; comment?: string ,created_at:Date}[] = [],
      public doesCustomerOrderThisProduct:boolean
    ) {}
  }
export class ProductResponse {
    constructor(
      public product_id:string,
      public seller_id:string,
      public name:string,
      public qty:number,
      public price:number,
      public pic_path:string[],
    ) {}
  }
