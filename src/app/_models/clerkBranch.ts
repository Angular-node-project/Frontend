export class ClerkBranch {
    constructor(
       public clerkBranch_id: string,
        public branch:{ 
            branch_id:string,
            name:string
        },
       public name: string,
        public email: string,
       public password: string,
      public  role:'Manager'| 'Cashier'|'StoreKeeper',
      public status:"active" | "inactive"
    ){}
  }
  