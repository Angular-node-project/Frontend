export class QtyRequest{
    constructor(
        public product_id:string,
        public product_name:string,
        public requiredQty:number,
        public branch:{branch_id:string,name:string},
        public requesterClerk:{clerk_id:string,name:string},
        public request_id:string,
        public acceptedQty:number,
        public status:"pending"|"allApproved"|"partiallyApproved"|"disapproved",
      
    ){}
}
export class QtyRequestClerk{
    constructor(
        public product_id:string,
        public  product_name:string,
        public requiredQty:number
    ){}
}