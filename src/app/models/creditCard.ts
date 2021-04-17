export interface CreditCard{
    id: number;
    customerId: number;
    cardTypeId:number;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear:number;
    cvv: number;
}