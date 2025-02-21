export class Cart {
  constructor(
    public _id: string,
    public cart_id: string,
    public product: { product_id: string, seller_id: string, name: string, qty: number, price: number, _id: string, pic_path: [string] }[],
    public customer_id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public Total: number,
    public err: string[]
  ) { }
}
export class BillingDetails {
  constructor(
    public address: string,
    public zipcode: string,
    public phone_number: string,
    public governorate: string,
    public additional_data: string
  ) { }
}
