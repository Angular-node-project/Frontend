
export class Permission{
    constructor(public permission_id:string,public controller:string ,public action:string){}
}
export class Role{
    constructor(public role_id:string
        ,public name:string
        ,public permissions:Permission[]
        ,public status :string
    ){}
}