import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => { 
    expect(component.menuItems).not.toBeUndefined();
  });
  
  it('should check menuItem is rendered', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
    expect(component.menuItems[0].name).toEqual('Home')
    expect(component.menuItems[1].name).toEqual('Gallery')
    expect(component.menuItems[2].name).toEqual('About Us')
    expect(component.menuItems[3].name).toEqual('Contact Us')
  });
});
