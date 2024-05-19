export const defaultDeposit: IDeposit = {
    id: "",
    amount: 0,
    identificationNumber: "",
    date: new Date().toISOString(),
    transaction:"Deposit"
  };
  
  export interface IDeposit {
    id: string;
    amount: number;
    identificationNumber: string;
    date: string;
    transaction:string
  }
  