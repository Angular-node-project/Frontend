export class QtyRequest{
    constructor(
        public product_id:string,
        public  product_name:string,
        public requiredQty:number
    ){}
}