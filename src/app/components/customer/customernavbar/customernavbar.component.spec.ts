import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernavbarComponent } from './customernavbar.component';

describe('CustomernavbarComponent', () => {
  let component: CustomernavbarComponent;
  let fixture: ComponentFixture<CustomernavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomernavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
