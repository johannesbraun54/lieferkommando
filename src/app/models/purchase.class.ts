import { Meal } from "./meal.class";

export class Purchase {
    amounts!:number[];
    products!: Meal[];
    prices!: number[];


    constructor(obj?:any){
        this.amounts = obj? obj.amounts : [];
        this.products = obj? obj.products : [];
        this.prices = obj? obj.prices : [];
    }

    toJson(){
        return { 
            amounts: this.amounts,
            products: this.products,
            prices: this.prices
        }
    }

}