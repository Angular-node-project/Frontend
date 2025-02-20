export class branchorders
{
constructor(
  public  branchOrder_id: string,
  public order_id:string,
  public status:  string,
  public branch: { branch_id: string, name: string },
 
  public orders: [{
    branchOrder_id:string,
    
  product:{
    product_id: string,
    name:  string,
    price: number,
    pics:[string],
   
   
  },
  qty:number,
 

}],

  
){}
}