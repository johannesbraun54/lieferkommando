import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: '' , component: ShopComponent },
    { path: 'order' , component: OrderComponent }
];
