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
birthDate: Date = new Date();
user = new User();
meal = new Meal();
firestore: Firestore = inject(Firestore);
purchaseInJson!:any;

constructor(public shoppingBasketService : ShoppingBasketService){
this.shoppingBasketService.getPurchase();
}

getActuallyTime(){
const currentDate: Date = new Date();

const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};

const formattedDate: string = currentDate.toLocaleDateString('de-DE', options);
this.shoppingBasketService.purchase.purchaseTime = formattedDate;
}

getPurchaseJson(){
  this.shoppingBasketService.purchase.toJson();
  this.purchaseInJson = this.shoppingBasketService.purchase.toJson();
  console.log('json', this.purchaseInJson);
}

getOrder(){
  this.getActuallyTime();
  this.getPurchaseJson();
  this.user.purchases = this.purchaseInJson;
  console.log(this.user);
  this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    addDoc(this.getUserDataRef(), this.user.toJson())
    .catch((err) => {
      console.error(err)
    })
    .then((result:any) => {
      this.loading = false;
    })
}

getUserDataRef(){
  return collection(this.firestore ,'users');
}


}