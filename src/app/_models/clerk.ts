import { Permission } from "./role-permisssion";

export class Clerk {
  constructor(
    public clerk_id: string,
    public name: string,
    public email: string,
    public password: string,
    public role_id: string,
    public role_name:string,
    public status: string,
  ) { }

}

export class ClerkLogin{
  constructor(public email:string,public password:string){}
}

export class AuthenticatedClerk{
  constructor(public id:string
    ,public email:string
    ,public name:string
    ,public user_typ:string
    ,public role_id:string
    ,public role_name:string
    ,public permissions:Permission[]
  ){}
}