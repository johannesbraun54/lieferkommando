import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShoppingBasketService } from './service/shopping-basket.service';
import { Meal } from './models/meal.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lieferkommando';
  localShoppingBasket!: Meal[];
  amounts!: number[];
  prices!: number[];

  constructor(public shoppingBasketService: ShoppingBasketService){
    this.localShoppingBasket = this.shoppingBasketService.localShoppingBasket;
    this.amounts = this.shoppingBasketService.amounts;
    this.prices = this.shoppingBasketService.prices;
  }

  reduceMeal(meal:Meal){
    this.shoppingBasketService.reduceMeal(meal);
  }

  addMeal(meal:Meal){
    this.shoppingBasketService.addMeal(meal)
  }

  sumOfPrices(){
    this.shoppingBasketService.sumOfPrices();
  }
}
