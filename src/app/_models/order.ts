export class Order {
  constructor(
    public order_id:  string,
    public customer_id:string,
    public cashier_id: string,
    public address: string,
    public governorate: string,
    public zipcode: number,
    public phone_number:  string,
    public additional_data:  string,
    public product: [{
        product_id: string,
        seller_id:  string,
        name:  string,
        qty:  number,
        price: number,
        pic_path:[string],
        status: string
    }],

    public createdAt:string,
    public customer={name:String,email:String},
    public cashier={name:String,email:String},
    public status: "pending" | "processing" | "shipped" | "cancelled"|"delivered",
    public totalPrice:  number,
  ){}

}
