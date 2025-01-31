export class Customer {
    constructor(public id:number,public name:string,public email:string,public phone_number:string,public address:string,public password:string,public isActive:string){}
}
export class CustomerLogin{
    constructor(public email:string,public password:string){}   
}