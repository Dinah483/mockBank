export const defaultWithdrawal: IWithdrawal = {
    id: "",
  amount: 0,
  identificationNumber: "",
  categoryName: "",
  date: new Date().toISOString(),
  transaction:"Withdrawal"
};

export interface IWithdrawal {
    id: string;
  amount: number;
  identificationNumber: string;
  categoryName: string;
  date: string;
  transaction:string
}
