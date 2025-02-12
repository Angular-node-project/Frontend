export class CustomerService{
    constructor(
     public name:string,
     public   email: string,
     public  inquiry: string,
     public  status:'resolved'| 'pending'
    ){}
    
}