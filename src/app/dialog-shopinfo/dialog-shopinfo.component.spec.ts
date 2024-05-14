import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShopinfoComponent } from './dialog-shopinfo.component';

describe('DialogShopinfoComponent', () => {
  let component: DialogShopinfoComponent;
  let fixture: ComponentFixture<DialogShopinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogShopinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogShopinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
