import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaCaliforniaComponent } from './baja-california.component';

describe('BajaCaliforniaComponent', () => {
  let component: BajaCaliforniaComponent;
  let fixture: ComponentFixture<BajaCaliforniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajaCaliforniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BajaCaliforniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
