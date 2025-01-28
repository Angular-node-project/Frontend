export class Response<T> {
    constructor(public status:number,public message:string,public data:T){}
}
