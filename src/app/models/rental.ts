export interface Rental{
    carId:number;
    customerId:number;
    rentDate:Date;
    returnDate:Date;
    carName?:string;
    dailyPrice?:number;
    brandName?:string;
    imagePath?:string;
    gearName?:string;
    fuelName?:string;
}