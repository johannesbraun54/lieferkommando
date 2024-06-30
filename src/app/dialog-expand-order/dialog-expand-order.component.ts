import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal.class';
import { MatIcon } from '@angular/material/icon';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Supplement } from '../models/supplement';


@Component({
  selector: 'app-dialog-expand-order',
  standalone: true,
  imports: [MatIcon, CommonModule, MatCheckboxModule],
  templateUrl: './dialog-expand-order.component.html',
  styleUrl: './dialog-expand-order.component.scss'
})

export class DialogExpandOrderComponent implements OnInit {
  meal = new Meal();
  subtotal!: number;
  supplementsArray: Supplement[] = [];

  constructor(public shoppingBasketService: ShoppingBasketService, private dialogRef: DialogRef) {
    this.meal.supplements.forEach((supplement) => {
      this.supplementsArray.push(supplement)
    })
    this.shoppingBasketService.dialogMealSum = this.meal.price
  }
  ngOnInit(): void {
    this.shoppingBasketService.dialogMealAmount = 1;
    this.initializeDialogValues()
  }

  initializeDialogValues() {
    this.shoppingBasketService.dialogMealAmount === 1 ? this.shoppingBasketService.dialogMealSum = this.meal.price : 
    this.shoppingBasketService.dialogMealSum = this.meal.price * this.shoppingBasketService.dialogMealAmount;
  }

  chooseSupplement(sup: Supplement) {
    sup.isAdded = !sup.isAdded;
    let currentSum;
    if (sup.isAdded) {
      currentSum = this.meal.price + sup.price;
      this.shoppingBasketService.dialogMealSum = currentSum * this.shoppingBasketService.dialogMealAmount;
    } else {
      this.shoppingBasketService.dialogMealSum -= sup.price * this.shoppingBasketService.dialogMealAmount;
    }
  }

  addMealToBasket(meal: Meal) {
    this.shoppingBasketService.addMeal(meal);
    this.closeDialog();
    this.shoppingBasketService.dialogMealAmount = 1;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
