import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let service: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        ProductsService,
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const spyService = spyOn(service, 'getProducts').and.returnValue(of([mockProduct()]));
     
      component.getProducts();
      
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(component.productData).toEqual([mockProduct()]);
      expect(component.showSpinner).toBeFalse();
    });

    it('should get product data initially on failure', () => {
      const spyService = spyOn(service, 'getProducts').and.returnValue(throwError('error'));
      
      component.getProducts();
     
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(component.showSpinner).toBeFalse();
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', { duration: 3000 });
    });
  });

  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should test editDialog', () => {
    component.editProduct(mockProduct());
    expect(dialog.open).toHaveBeenCalled();
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      const spyService = spyOn(service, 'deleteProduct').and.returnValue(of(mockProduct()));
     
      component.deleteProduct(mockProduct());
      
      expect(spyService).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', { duration: 3000 });
    });

    it('should test deleteProduct on failure', () => {
      const spyService = spyOn(service, 'deleteProduct').and.returnValue(throwError('error'));
      
      component.deleteProduct(mockProduct());

      expect(spyService).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', { duration: 3000 });
    });
  });
});

function mockProduct(): Product {
  return {id: '1', title: 'test', description: 'test', price: '100', category: 'test'};
}