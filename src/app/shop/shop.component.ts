import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { Meal } from '../models/meal.class';
import { RouterModule } from '@angular/router';
import { DialogShopinfoComponent } from '../dialog-shopinfo/dialog-shopinfo.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogExpandOrderComponent } from '../dialog-expand-order/dialog-expand-order.component';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatIcon,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    DialogShopinfoComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  firestore: Firestore = inject(Firestore);
  unsubMealsList;
  meal: Meal = new Meal();
  allMeals: Meal[] = [];


  constructor(public shoppingBasketService: ShoppingBasketService, public dialog: MatDialog,) {
    this.shoppingBasketService.orderCompleted = false;
    this.shoppingBasketService.userAtShop = true;
    this.unsubMealsList = onSnapshot(this.getMealRef(), (mealsList) => {
      mealsList.forEach((m) => {
        let meal = m.data() as Meal;
        this.allMeals.push(meal);
      });
    })
  }

  openInfoDialog() {
    this.dialog.open(DialogShopinfoComponent);
  }

  openExpandOrderDialog(meal:Meal) {
    const dialog = this.dialog.open(DialogExpandOrderComponent);
    dialog.componentInstance.meal = new Meal(meal);
  }

  addToBasket(meal: Meal) {
    this.shoppingBasketService.addMeal(meal);
  }

  getMealRef() {
    return collection(this.firestore, 'meals');
  }
}
