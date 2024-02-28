import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShoppingBasketService } from './service/shopping-basket.service';
import { Meal } from './models/meal.class';
import { Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
    MatNativeDateModule,
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'lieferkommando';
  localShoppingBasket!: Meal[];
  amounts!: number[];
  prices!: number[];
  @ViewChild('drawer') drawer!: MatDrawer;
  private resizeListener!: () => void;
  private orderCompletedSubscription!: Subscription;


  constructor(public shoppingBasketService: ShoppingBasketService, private renderer: Renderer2) {
    this.shoppingBasketService.loadDataFromLocalStorage();
    this.shoppingBasketService.getSumOfProducts();
  }


  closeDrawer() {
    this.drawer.close();
  }

  ngAfterViewInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.checkAndCloseDrawer();
    });

    if (this.shoppingBasketService.textareas) {
      this.shoppingBasketService.textareas.forEach((textarea, index) => {
        console.log(`Textarea ${index + 1}:`, textarea.nativeElement);
        // Weitere Logik hier...
      });
    }
  }

  checkAndCloseDrawer() {
    if ((window.innerWidth < 940 && this.drawer.opened)) {
      this.drawer.close();
    } else if (window.innerWidth >= 940 && !this.drawer.opened) {
      this.drawer.open();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  async ngOnInit() {
    this.shoppingBasketService.loadDataFromLocalStorage();

  }

  reduceMeal(meal: Meal) {
    this.shoppingBasketService.reduceMeal(meal);
  }

  addMeal(meal: Meal) {
    this.shoppingBasketService.addMeal(meal)
  }

  sumOfPrices() {
    this.shoppingBasketService.sumOfPrices();
  }
}
