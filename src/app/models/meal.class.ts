export class Meal {
    mealName:string;
    price:number;
    description: string;
    ingredients: any; 
    mealId: string;

    constructor(obj?:any){
        this.mealName = obj? obj.mealName : '',
        this.price = obj? obj.price : '',
        this.description = obj? obj.description : '',
        this.ingredients = obj? obj.ingredients : '',
        this.mealId = obj? obj.mealId : '' 
    }

    public toJson(){
        return {
            mealName: this.mealName,
            price: this.price,
            description: this.description,
            ingredients: this.ingredients,
            mealId : this.mealId
        }
    }
}