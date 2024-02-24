import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { FormBuilder, FormControl, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { Meal } from '../models/meal.class';
import { ShoppingBasketService } from '../service/shopping-basket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


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
    ReactiveFormsModule],
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
street: FormControl = new FormControl('', Validators.minLength(5));
zipCode: FormControl = new FormControl('', Validators.minLength(5));
city: FormControl = new FormControl('', Validators.minLength(3));


constructor(public shoppingBasketService : ShoppingBasketService){
this.shoppingBasketService.getPurchase();
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