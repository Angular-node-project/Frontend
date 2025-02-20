export class Seller{
    constructor(public seller_id:string
        ,public name:string
        ,public email:string
        ,public status:string
        ,public national_id:string
        ,public phone_number:String
        ,public registeration_number:string
    ){}
}
export class SellerLogin{
    constructor(public email:string
        ,public password:string
    ){}
}