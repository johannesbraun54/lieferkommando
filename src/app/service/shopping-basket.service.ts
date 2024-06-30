import { ElementRef, Inject, Injectable, QueryList, ViewChildren, inject, viewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meal } from '../models/meal.class';
import { Purchase } from '../models/purchase.class';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';

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
  textValues: string[] = [];
  userAtImprint = false;
  dialogMealAmount: number = 1;
  dialogMealSum!: number;
  mealAmounts: number[] = [];
  unsubMealsList!: any;
  allMeals: Meal[] = [];

  constructor(@Inject(DOCUMENT) public document: Document) {
    this.localStorage = this.document.defaultView?.localStorage;
  }

  getMealsList() {
    this.allMeals = [];
    this.unsubMealsList = onSnapshot(this.getMealRef(), (mealsList) => {
      mealsList.forEach((m) => {
        let meal = m.data() as Meal;
        this.allMeals.push(meal);
        this.createAmounts(meal);
      });
    })
  }

  getMealRef() {
    return collection(this.firestore, 'meals');
  }

  toggleTextField(index: number): void {
    this.localShoppingBasket[index].showTextField = !this.localShoppingBasket[index].showTextField;
    this.textValues[index] = '';
  }

  toggleEditTextField(index: number): void {
    this.localShoppingBasket[index].showTextField = !this.localShoppingBasket[index].showTextField;
  }

  addRemarkToMeal(meal: Meal, i: number) {
    meal.remark = this.textValues[i];
    this.toggleEditTextField(i);
    this.saveDataInLocalStorage();
  }

  deleteRemark(meal: Meal, i: number) {
    meal.remark = '';
    this.textValues[i] = '';
    this.toggleTextField(i);
    this.saveDataInLocalStorage();
  }

  getPurchase() {
    this.purchase.amounts = this.amounts;
    this.purchase.products = this.localShoppingBasket;
    this.purchase.prices = this.prices;
  }

  reduceDialogMeal(meal: Meal) {
    this.dialogMealAmount === 1 ? this.dialogMealSum = meal.price : this.dialogMealSum = meal.price * this.dialogMealAmount;
    this.dialogMealAmount <= 1 ? this.dialogMealAmount = 1 : this.dialogMealAmount--;
    //this.getMealsList();
  }


  increaseDialogMeal(meal: Meal) {
    this.dialogMealAmount === 1 ? this.dialogMealSum = meal.price : this.dialogMealSum = meal.price * this.dialogMealAmount;
    this.dialogMealAmount++;
    this.dialogMealSum = meal.price * this.dialogMealAmount;
    //this.getMealsList();
  }

  createAmounts(meal: Meal) {
    let currentMeal = meal;
    let index = this.localShoppingBasket.findIndex(m => m.mealName == currentMeal.mealName);
    let amount = this.amounts[index];
    amount ? this.mealAmounts.push(amount) : this.mealAmounts.push(0);
  }

  countAmounts() {
    for (let i = 0; i < this.allMeals.length; i++) {
      const meal = this.allMeals[i];
      let index = this.localShoppingBasket.findIndex(m => m.mealName == meal.mealName);
      let amount = this.amounts[index];
      amount ? this.mealAmounts[i] = amount : this.mealAmounts[i] = 0;
    }
  }

  addMeal(currentMeal: Meal) {
    this.emptyMeal = false;
    let price = currentMeal.price * this.dialogMealAmount;
    let mealToAdd = currentMeal;
    let index = this.localShoppingBasket.findIndex(meal => meal.mealName === mealToAdd.mealName);
    if (index == -1) {
      this.prices.push(price);
      this.amounts.push(this.dialogMealAmount);
      this.localShoppingBasket.push(mealToAdd);
      this.sumOfPrices();
      this.getSumOfProducts();
      this.countAmounts();
      this.saveDataInLocalStorage();
    } else {
      this.amounts[index] += this.dialogMealAmount;
      this.prices[index] = this.prices[index] + price;
      this.sumOfPrices();
      this.getSumOfProducts();
      this.countAmounts();
      this.saveDataInLocalStorage();
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
      this.getSumOfProducts();
      this.saveDataInLocalStorage();
      this.getMealsList();
      this.countAmounts();
    }
  }

  deleteMeal(index: number) {
    this.amounts.splice(index, 1);
    this.prices.splice(index, 1);
    this.sumOfPrices();
    this.localShoppingBasket.splice(index, 1);
    this.localShoppingBasket.length < 1 ? this.emptyMeal = true : this.emptyMeal = false;
    this.getSumOfProducts();
    this.countAmounts();
    this.saveDataInLocalStorage();
  }

  getSumOfProducts() {
    this.sumOfProducts = 0;
    for (let i = 0; i < this.amounts.length; i++) {
      const amount = this.amounts[i];
      this.sumOfProducts += amount
    }

    return this.sumOfProducts
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
