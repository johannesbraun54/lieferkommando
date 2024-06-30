export class Supplement {
    name: string;
    price: number;
    isAdded: boolean;

    constructor(obj?: any) {
        this.name = obj.name ? obj.name : '';
        this.price = obj.price ? obj.price : '';
        this.isAdded = obj.isAdded ? obj.isAdded : false;
    }

}