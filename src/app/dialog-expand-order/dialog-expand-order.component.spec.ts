import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpandOrderComponent } from './dialog-expand-order.component';

describe('DialogExpandOrderComponent', () => {
  let component: DialogExpandOrderComponent;
  let fixture: ComponentFixture<DialogExpandOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExpandOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogExpandOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
