import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.class';
import { Purchase } from '../models/purchase.class';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {
purchase = new Purchase; 
localShoppingBasket:Meal[] = [];
amounts: number[] = [];
prices: number[]= [];
emptyMeal = true;
userAtShop = true;
subTotal!:number;
endSum!:number;

  constructor() {

   }

  getPurchase(){
    this.purchase.amounts = this.amounts;
    this.purchase.products = this.localShoppingBasket;
    this.purchase.prices = this.prices;
    console.log(this.purchase);
  }


  addMeal(meal:Meal){
    this.emptyMeal = false;
    let index =  this.localShoppingBasket.indexOf(meal);
    if (index != -1) {
      this.amounts[index]++;
      console.log(this.prices[index]);
      this.prices[index] = this.prices[index] + meal.price
      this.sumOfPrices();
    } else {
      this.prices.push(meal.price);
      this.amounts.push(1);
      this.localShoppingBasket.push(meal);
      this.sumOfPrices();
    }
  }

  reduceMeal(meal:Meal){
    let index =  this.localShoppingBasket.indexOf(meal);
    if (this.amounts[index] == 1) {
      this.deleteMeal(index);
    } else{
      this.amounts[index]--;
      this.prices[index] -= meal.price;
      this.sumOfPrices();
    }
  }

  deleteMeal(index:number) {
    this.amounts.splice(index, 1);
    this.prices.splice(index, 1);
    this.sumOfPrices();
    this.localShoppingBasket.splice(index,1);
    this.localShoppingBasket.length < 1 ? this.emptyMeal = true : this.emptyMeal = false;  
  }

  sumOfPrices(){
    let sum = 0;
    for (let i = 0; i < this.prices.length; i++) {
       let price = this.prices[i];
       this.subTotal = sum += price
       this.endSum = this.subTotal + 1.99
       this.purchase.totalAmount = this.endSum;
    }
  }

  orderMeals(){
    this.userAtShop = false;
  }

}
