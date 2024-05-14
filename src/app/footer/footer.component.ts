import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingBasketService } from '../service/shopping-basket.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Output() impressumClicked: EventEmitter<any> = new EventEmitter();
  @Output() privacyClicked: EventEmitter<any> = new EventEmitter();

  constructor(public shoppingBasketService: ShoppingBasketService) {

  }


  onClickLink() {
    this.impressumClicked.emit();
  }

}
