import { Byte } from "@angular/compiler/src/util";

export interface User{
    userId:number;
    firstName:string;
    lastName:string;
    email:string;
    passwordSalt:any;
    passwordHash:any;
    status:boolean;
}