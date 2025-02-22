export class CashierReceipt  {
  constructor(
    public product: {
      product_id: string,
      seller_id: string,
      name: string,
      qty: number,
      price: number,
      pic_path: [string],
    }[],
    public address: string,
    public zipcode: string,
    public phone_number: string,
    public governorate: string,
    public additional_data: string,
    public totalPrice: number,
    public CreatedAt:Date
  ) { }
}
