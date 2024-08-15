import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData!: Product[];
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  
  /**
   * Obtém os produtos do servidor.
   * 
   * @returns Um Observable que emite os dados dos produtos.
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  
  }

  /**
   * Abre um dialog para adicionar um produto.
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

 
  /**
   * Abre um dialog de edição de um produto.
   * 
   * @param product - O produto a ser editado.
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * Deleta um produto.
   * 
   * @param product - O objeto do produto a ser deletado.
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
