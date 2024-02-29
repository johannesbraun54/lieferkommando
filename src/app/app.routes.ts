import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';



export const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'order', component: OrderComponent },
    { path: 'orderCompleted', component: OrderCompletedComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy', component: PrivacyPolicyComponent}
];
