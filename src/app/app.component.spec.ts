import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`,
})
class MockNavBarComponent {}

@Component({
  selector: 'app-products',
  template: `<div></div>`,
})
class MockProductsComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-navbar', () => {
    const childComponent = fixture.debugElement.query(By.directive(MockNavBarComponent)).componentInstance;
    expect(childComponent).toBeTruthy()
  });

  it('should have app-products', () => {
    const childComponent = fixture.debugElement.query(By.directive(MockProductsComponent)).componentInstance;
    expect(childComponent).toBeTruthy()
  });

  it('should test sum of two numbers', () => {
    const a = 1;
    const b = 2;

    const result = component.add(a, b);
    
    expect(result).toBe(3);
  });
});
