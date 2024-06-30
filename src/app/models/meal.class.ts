import { Supplement } from "./supplement";

export class Meal {
    mealName: string;
    price: number;
    description: string;
    ingredients: any;
    mealId: string;
    showTextField: boolean;
    remark: string;
    supplements: Supplement[] = [{
        name: 'beef',
        price: 7.00,
        isAdded: false,
    },
    {
        name: 'pommmes',
        price: 7.00,
        isAdded: false,
    },
    {
        name: 'cola',
        price: 7.00,
        isAdded: false,
    }
    ]

    constructor(obj?: any) {
        this.mealName = obj ? obj.mealName : '',
        this.price = obj ? obj.price : '',
        this.description = obj ? obj.description : '',
        this.ingredients = obj ? obj.ingredients : '',
        this.mealId = obj ? obj.mealId : '',
        this.showTextField = obj ? obj.showTextField : false,
        this.remark = obj ? obj.remark : '';
        this.supplements = obj ? obj.supplements : [{
            name: 'beef',
            price: 7.00,
            isAdded: false,
        },
        {
            name: 'pommmes',
            price: 7.00,
            isAdded: false,
        },
        {
            name: 'cola',
            price: 7.00,
            isAdded: false,
        }];
    }

    public toJson() {
        return {
            mealName: this.mealName,
            price: this.price,
            description: this.description,
            ingredients: this.ingredients,
            mealId: this.mealId,
            showTextField: this.showTextField,
            remark: this.remark,
            supplements: this.supplements
        }
    }
}

