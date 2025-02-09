export class Order {
  constructor(
    public order_id:  String,
    public customer_id:String,
    public cashier_id: String,
    public address: String,
    public governorate: String,
    public zipcode: Number,
    public phone_number:  String,
    public additional_data:  String,
    public product: [{
        product_id: String,
        seller_id:  String,
        name:  String,
        qty:  Number,
        price: Number,
        pic_path:[String],
        status: String
    }],
    public status:  String,
    public totalPrice:  String,
    public createdAt:string
  ){}

}
