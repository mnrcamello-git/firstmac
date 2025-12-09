import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule]
})
export class ProductCardComponent {
  // This is where I implemented the take-home requirement: Custom Component: Accept product data as input properties
  @Input({ required: true }) product!: Product;

  constructor(private router: Router) {}

  // Check if product has a discount to show the badge
  get hasDiscount(): boolean {
    return this.product?.discount > 0;
  }

  // Format price with dollar sign
  get formattedPrice(): string {
    return this.product?.price ? `$${this.product.price}` : '$0';
  }

  // Navigate to product detail page
  viewProduct(): void {
    this.router.navigate(['/tabs/product', this.product.id]);
  }
}
