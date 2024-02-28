import { Component } from '@angular/core';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-completed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-completed.component.html',
  styleUrl: './order-completed.component.scss'
})
export class OrderCompletedComponent {
  constructor(public shoppingBasketService: ShoppingBasketService){
    this.shoppingBasketService.emptyMeal = true;
    this.shoppingBasketService.orderCompleted = true;
    this.shoppingBasketService.amounts = [];
    this.shoppingBasketService.localShoppingBasket = [];
    this.shoppingBasketService.prices = [];
    this.shoppingBasketService.sumOfPrices();
    this.shoppingBasketService.saveDataInLocalStorage();
  }


}
