import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal.class';
import { MatIcon } from '@angular/material/icon';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-expand-order',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './dialog-expand-order.component.html',
  styleUrl: './dialog-expand-order.component.scss'
})
export class DialogExpandOrderComponent implements OnInit {
  meal!: Meal;
  subtotal!:number;
  constructor(public shoppingBasketService:ShoppingBasketService, private dialogRef:DialogRef ) {
  }
  ngOnInit(): void {
    //this.subtotal = this.meal.price
    this.shoppingBasketService.dialogMealAmount = 1;
  }

  addMealToBasket(meal:Meal){
    this.shoppingBasketService.addMeal(meal);
    this.closeDialog();
    this.shoppingBasketService.dialogMealAmount = 1;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
