import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let service: ProductsService;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        {provide: MatSnackBar, useValue: matSnackBar},
        {provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close', 'open']),},
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductsService);
    dialogRef = TestBed.inject(MatDialogRef);
    matSnackBar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = mockProduct();
    expect(component).toBeTruthy()
  });

  it('should init the form', () => {
    component.data = mockProduct();
   
    component.ngOnInit();

    expect(component.productForm).not.toBeUndefined();
    expect(component.productForm.get('title')?.value).toEqual('test');
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const spySaveProduct = spyOn(service, 'saveProduct').and.returnValue(of(mockProduct()));
      component.saveProduct();
      
      expect(spySaveProduct).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', {duration: 3000});
      expect(dialogRef.close).toHaveBeenCalledTimes(1)
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const spySaveProduct = spyOn(service, 'saveProduct').and.returnValue(throwError('error'));
      component.saveProduct();
      
      expect(spySaveProduct).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {duration: 3000});
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      component.data = mockProduct();
      component.ngOnInit();
      
      component.saveProduct();

      expect(component.productForm.get('title')?.value).toEqual('test');
    });

    it('should call the saveProduct while editing the product', () => {
      component.data = mockProduct();
      const spyUodateProduct = spyOn(service, 'updateProduct').and.returnValue(of(mockProduct()));
      
      component.saveProduct();

      expect(spyUodateProduct).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', {duration: 3000});
      expect(dialogRef.close).toHaveBeenCalledTimes(1)
    });

    it('should test the saveProduct for failure while update a product', () => {
      component.data = mockProduct();
      const spyUodateProduct = spyOn(service, 'updateProduct').and.returnValue(throwError('error'));
      
      component.saveProduct();

      expect(spyUodateProduct).toHaveBeenCalledTimes(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {duration: 3000});
    });
  });
});

function mockProduct(): Product {
  return {id: '1', title: 'test', description: 'test', price: '100', category: 'test'};
}