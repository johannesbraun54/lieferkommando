import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Meal } from '../models/meal.class';
import { ShoppingBasketService } from '../service/shopping-basket.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
loading = false;
birthDate: any;
user = new User();
meal = new Meal();

purchase = [{
  amounts: this.shoppingBasketService.amounts,
  product : this.shoppingBasketService.localShoppingBasket,
  prices: this.shoppingBasketService.prices
}]

constructor(public shoppingBasketService : ShoppingBasketService){
  this.shoppingBasketService.getPurchase();
}



getPurchases(){

}

getUser(){
  this.user.purchases = this.shoppingBasketService.purchase
  console.log(this.user);
}


}