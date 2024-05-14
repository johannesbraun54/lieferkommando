

export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: string;
    city: string;
    customUserId: string;
    purchases: any = [];
    totalRevenue: number;
    totalPurchasesAmount: number;



    constructor(obj?: any) {

        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.customUserId = obj ? obj.customUserId : '';
        if (obj) {
            this.purchases.push(obj.purchases);
        }
        this.totalRevenue = obj? obj.totalRevenue : 0;
        this.totalPurchasesAmount = obj? obj.totalPurchasesAmount : 0;
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            customUserId: this.customUserId,
            purchases: this.purchases,
            totalRevenue: this.totalRevenue,
        }
    }
}

