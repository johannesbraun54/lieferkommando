import { ElementRef, Inject, Injectable, QueryList, ViewChildren, inject, viewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meal } from '../models/meal.class';
import { Purchase } from '../models/purchase.class';
import { Firestore, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {
  purchase = new Purchase;
  localShoppingBasket: Meal[] = [];
  amounts: number[] = [];
  prices: number[] = [];
  emptyMeal = true;
  userAtShop = true;
  orderCompleted = false;
  subTotal!: number;
  endSum!: number;
  firestore: Firestore = inject(Firestore);
  localStorage: any;
  sumOfProducts: number = 0;
  @ViewChildren('textareas') textareas!: QueryList<ElementRef>;
  textValues: string[] = []; // Array zur Speicherung der Textfeldwerte


  constructor(@Inject(DOCUMENT) public document: Document) {
    this.localStorage = this.document.defaultView?.localStorage;
  }

  toggleTextField(index: number): void {
    this.localShoppingBasket[index].showTextField = !this.localShoppingBasket[index].showTextField;
  }

  addTextValue(value: string, index: number): void {
    //const target = event.target as HTMLInputElement; // Typumwandlung, um TypeScript mitzuteilen, dass es sich um ein HTMLInputElement handelt
    this.textValues[index] = value;
  }

  getPurchase() {
    this.purchase.amounts = this.amounts;
    this.purchase.products = this.localShoppingBasket;
    this.purchase.prices = this.prices;
  }


  addMeal(meal: Meal) {
    this.emptyMeal = false;
    let index = this.localShoppingBasket.indexOf(meal);
    if (index != -1) {
      this.amounts[index]++;
      console.log(this.prices[index]);
      this.prices[index] = this.prices[index] + meal.price
      this.sumOfPrices();
      this.getSumOfProducts()
      this.saveDataInLocalStorage();
    } else {
      const textareaId = `textarea-${this.localShoppingBasket.length + 1}`;
      meal.textareaId = textareaId;
      this.prices.push(meal.price);
      this.amounts.push(1);
      this.localShoppingBasket.push(meal);
      this.sumOfPrices();
      this.getSumOfProducts()
      this.saveDataInLocalStorage();
      console.log(textareaId)
    }
  }

  reduceMeal(meal: Meal) {
    let index = this.localShoppingBasket.indexOf(meal);
    if (this.amounts[index] == 1) {
      this.deleteMeal(index);
    } else {
      this.amounts[index]--;
      this.prices[index] -= meal.price;
      this.sumOfPrices();
      this.getSumOfProducts()
      this.saveDataInLocalStorage();
    }
  }

  deleteMeal(index: number) {
    this.amounts.splice(index, 1);
    this.prices.splice(index, 1);
    this.sumOfPrices();
    this.localShoppingBasket.splice(index, 1);
    this.localShoppingBasket.length < 1 ? this.emptyMeal = true : this.emptyMeal = false;
    this.getSumOfProducts()
    this.saveDataInLocalStorage();
  }

  getSumOfProducts() {
    this.sumOfProducts = 0;
    for (let i = 0; i < this.amounts.length; i++) {
      const amount = this.amounts[i];
      this.sumOfProducts += amount
    }
  }

  sumOfPrices() {
    let sum = 0;
    for (let i = 0; i < this.prices.length; i++) {
      let price = this.prices[i];
      sum += price;
    }
    this.subTotal = sum;
    this.endSum = this.subTotal + 1.99;
    this.purchase.totalAmount = this.endSum;
  }


  orderMeals() {
    this.userAtShop = false;
  }

  getSingleDocRef(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }


  saveDataInLocalStorage() {
    if (this.localStorage) {
      this.localStorage.setItem('localShoppingBasket', JSON.stringify(this.localShoppingBasket));
      this.localStorage.setItem('prices', JSON.stringify(this.prices));
      this.localStorage.setItem('amounts', JSON.stringify(this.amounts));
    }
  }

  loadDataFromLocalStorage() {
    if (this.localStorage) {
      const localShoppingBasketStr = this.localStorage.getItem('localShoppingBasket');
      const priceStr = this.localStorage.getItem('prices');
      const amountsStr = this.localStorage.getItem('amounts');

      if (localShoppingBasketStr && priceStr && amountsStr) {
        this.localShoppingBasket = JSON.parse(localShoppingBasketStr);
        this.prices = JSON.parse(priceStr);
        this.amounts = JSON.parse(amountsStr);
        this.localShoppingBasket.length > 0 ? this.emptyMeal = false : this.emptyMeal = true;
        this.sumOfPrices();
      }
    }
  }
}
