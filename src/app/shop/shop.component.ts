import { Component, Input, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { Meal } from '../models/meal.class';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatIcon,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
firestore:Firestore = inject(Firestore);
unsubMealsList;
meal: Meal = new Meal();
allMeals:any = [];


constructor(public shoppingBasketService: ShoppingBasketService){
  this.shoppingBasketService.orderCompleted = false;
  this.shoppingBasketService.userAtShop = true;
  this.unsubMealsList = onSnapshot(this.getMealRef(),(mealsList) => {
    mealsList.forEach((meal) => {
      this.allMeals.push(meal.data())
    });
  })
}


addToBasket(meal:Meal){
  this.shoppingBasketService.addMeal(meal);
}

getMealRef(){
  return collection(this.firestore, 'meals');
}
}
