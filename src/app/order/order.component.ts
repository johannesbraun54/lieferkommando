import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Meal } from '../models/meal.class';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { Purchase } from '../models/purchase.class';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule],
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
step = 0;
firstName: FormControl = new FormControl('', Validators.minLength(2));
lastName: FormControl = new FormControl('', Validators.minLength(2));
emailInput: FormControl = new FormControl('', Validators.email);
street: FormControl = new FormControl('', Validators.pattern(/^[a-zA-ZäöüÄÖÜß\s]+ \d+[a-zA-Z]?$/));
zipCode: FormControl = new FormControl('', Validators.minLength(5));
city: FormControl = new FormControl('', Validators.minLength(3));
findUser!:any;
currentCustomerId!:string;
currentCustomer:any;
userCollection:any = [];
unsubUserList:any;
currentPurchases:any[] = [];

constructor(public shoppingBasketService : ShoppingBasketService){
  this.shoppingBasketService.loadDataFromLocalStorage();
  this.unsubUserList = onSnapshot(this.getUserDataRef(),(userList) => {
    this.userCollection = [];
    userList.forEach((user) => {
      let customUserId = user.get('customUserId');
      let userdata = user.data();
      customUserId = user.id;
      userdata['customUserId'] = customUserId;
      this.userCollection.push(userdata);
    })
  });
  this.shoppingBasketService.userAtShop = false;
  this.shoppingBasketService.getPurchase();
  this.shoppingBasketService.purchase.toJson; 


}

setStep(index: number) {
  this.step = index;
}

nextStep() {
  this.step++;
}

prevStep() {
  this.step--;
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
  this.user.purchases.push(this.purchaseInJson);
}

getCustomerPurchaseJson(){
  this.currentCustomer.purchase
}

getOrder(){
  this.findUserData();
  this.getActuallyTime();
  this.getPurchaseJson();
  this.loading = true;
  this.user.birthDate = this.birthDate.getTime();
  if (this.currentCustomerId) {
    this.pushOrderToKnownUser()
  } else {
    addDoc(this.getUserDataRef(), this.user.toJson())
    .catch((err) => {
      console.error(err)
    })
    .then((result:any) => {
      this.loading = false;
      console.log('added user', this.user)
    })
  }
}

async pushOrderToKnownUser(){
  let docRef = this.shoppingBasketService.getSingleDocRef(this.currentCustomerId);
  this.getNewPurchaseJson();
  this.currentCustomer.purchases = this.currentPurchases;
  this.user.purchases = [];
  this.currentCustomer.purchases.forEach((purchase: Purchase) => {
    this.user.purchases.push(purchase);
  })
  await updateDoc(docRef, this.user.toJson());
}

getNewPurchaseJson(){
  this.currentCustomer.purchases.forEach((purchase:any) => {
    let jsonPurchase = this.newPurchaseToJson(purchase);
    this.currentPurchases.push(jsonPurchase);
  })
}

newPurchaseToJson(obj:Purchase){
  return { 
      amounts: obj.amounts,
      products: obj.products,
      prices: obj.prices,
      purchaseTime: obj.purchaseTime,
      totalAmount: obj.totalAmount,
  }
}


findUserData(): void {
  const foundUser = this.userCollection.find((userdata: { email: string; }) => userdata.email === this.user.email);
  if(foundUser){
    this.currentCustomer = foundUser;
    this.currentCustomerId = foundUser.customUserId; 
    this.currentCustomer.purchases.push(this.shoppingBasketService.purchase);
    console.log('currentCustomer',this.currentCustomer.purchases);
  }
 

 
}



getUserDataRef(){
  return collection(this.firestore ,'users');
}


}