export const defaultAccount: IAccount = {
    id:"",
    email:"",
    name:"",
    surname:"",
    balance:0,
    identificationNumber:"",
    accountNumber:"",
    bank:"",
    branchCode:"",
    paymentType:""
};

export interface IAccount {
    id:string,
    email:string,
    name:string,
    surname:string,
    balance:number,
    identificationNumber:string,
    accountNumber:string,
    bank:string,
    branchCode:string,
    paymentType:string
}

