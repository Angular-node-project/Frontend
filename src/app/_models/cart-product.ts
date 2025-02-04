export class CartProduct {
  constructor(
    public product_id:string,
    public seller_id:string,
    public name:string,
    public qty:number,
    public price:number,
    public _id:string,
    public pic_path:[string],
  ){}
}
