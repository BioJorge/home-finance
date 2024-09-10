export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
  sex: string;
  currency: "EUR" | "USD" | "BRL";
  balance: number;
}
