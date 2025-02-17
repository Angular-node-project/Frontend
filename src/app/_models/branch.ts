export class Branch {
    constructor(
      public branch_id:string,
      public name:string,
      public location:string,
      public status:"active" | "inactive",
      public qty:number
    ){}
  }
  