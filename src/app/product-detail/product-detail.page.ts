import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonBackButton, IonButtons, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonButton, IonBackButton, IonButtons, IonSpinner, CommonModule
  ]
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Get product ID from route
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(parseInt(productId));
    } else {
      this.error = 'Product ID not found';
      this.isLoading = false;
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id)
      .pipe(
        catchError(err => {
          this.error = 'Product not found';
          return of(null);
        })
      )
      .subscribe({
        next: (product: Product | null) => {
          this.product = product;
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Failed to load product';
          this.isLoading = false;
        }
      });
  }

  // Format price with dollar sign
  get formattedPrice(): string {
    return this.product?.price ? `$${this.product.price}` : '$0';
  }

  // Check if product has discount
  get hasDiscount(): boolean {
    return this.product?.discount ? this.product.discount > 0 : false;
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab1']);
  }
}
