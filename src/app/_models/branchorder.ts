export class branchorders {
  constructor(
    public branchOrder_id: string,
    public order_id: string,
    public status: string,
    public branch: { branch_id: string, name: string },
    public totalPrice: number,
    public customer_id: string | null,
    public cashier_id: string | null,
    public customer_name: string | null,
    public cashier_name: string | null,
    public createdAt:Date,
    public orders: [{
      branchOrder_id: string,

      product: {
        product_id: string,
        name: string,
        price: number,
        pics: [string],


      },
      qty: number,


    }],


  ) { }
}