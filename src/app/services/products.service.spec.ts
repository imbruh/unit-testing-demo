import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from 'src/app/models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const retorno = service.getProducts();
    expect(retorno).not.toBeUndefined();
  });

  it('should test saveProducts', () => {
    const product: Product = {
      id: '1',
      title: 'Product 1',
      price: '10',
      description: 'Description 1',
      category: 'Category 1',
    };
    const retorno = service.saveProduct(product);
    expect(retorno).not.toBeUndefined();
  });

  it('should test updateProduct', () => {
    const product: Product = {
      id: '1',
      title: 'Product 1',
      price: '10',
      description: 'Description 1',
      category: 'Category 1',
    };
    const retorno = service.updateProduct(product);
    expect(retorno).not.toBeUndefined();
  });

  it('should test deleteProduct', () => {
    const retorno = service.deleteProduct(1);
    expect(retorno).not.toBeUndefined();
  });
});
