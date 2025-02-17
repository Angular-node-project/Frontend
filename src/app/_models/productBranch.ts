export class ProductBranch {
    constructor(
     public product_id: string,
      public categories: {category_id:string,name:string}[],
      public name: string,
      public description: string,
      public qty: number,
      public price: number,
      public seller_id: string,
      public seller_name:string,
      public status: "active" | "inactive" | "pending" | "outStock"|"deleted",
      public show:"online"|"offline"|"all",
      public pics: string[] = [],
      public reviews: { customer: {customer_id: string,name:string}, rate: number; comment?: string ,created_at:Date}[] = [],
      public branch_qty:number,
      public branch_status:string
    ){}
}