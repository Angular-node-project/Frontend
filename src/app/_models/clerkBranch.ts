export class ClerkBranch {
  constructor(
    public clerkBranch_id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public status: string,
    public branch:{branch_id:string,name:string}
  ) { }

}

export class ClerkBranchLogin{
  constructor(public email:string,public password:string){}
}

