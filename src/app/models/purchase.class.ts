import { Meal } from "./meal.class";

export class Purchase {
    amounts!:number[];
    products!: Meal[];
    prices!: number[];
    purchaseTime : string;
    totalAmount : number;


    constructor(obj?:any){
        this.amounts = obj? obj.amounts : [];
        this.products = obj? obj.products : [];
        this.prices = obj? obj.prices : [];
        this.purchaseTime = obj? obj.purchaseTime : '';
        this.totalAmount = obj? obj.totalAmount : '';
    }

    toJson(){
        return { 
            amounts: this.amounts,
            products: this.products,
            prices: this.prices,
            purchaseTime: this.purchaseTime,
            totalAmount: this.totalAmount
        }
    }

}