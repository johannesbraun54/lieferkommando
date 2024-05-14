import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
import { FooterComponent } from './footer/footer.component';

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
    FormsModule,
    FooterComponent],
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


  constructor(public shoppingBasketService: ShoppingBasketService, private renderer: Renderer2, private router: Router) {
    this.shoppingBasketService.loadDataFromLocalStorage();
    this.shoppingBasketService.getSumOfProducts();
    this.goToImprint();

  }

  goToImprint() {
    if (this.shoppingBasketService.userAtImprint) {
      this.drawer.close();
    }
  }

  closeDrawer() {
    this.drawer.close();
  }

  checkCurrentUrl() {
    if(this.drawer){
      const currentUrl = this.router.url;
      if (currentUrl === '/order') {
          this.drawer.close();
      }else {
        this.drawer.opened = true;
      }
    }
  }


  ngAfterViewInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.checkAndCloseDrawer();
    });
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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentUrl();
      }
    });
  }

  reduceMeal(meal: Meal) {
    this.shoppingBasketService.reduceMeal(meal);
  }

  addMeal(meal: Meal) {
    this.shoppingBasketService.addMeal(meal)
  }


}
