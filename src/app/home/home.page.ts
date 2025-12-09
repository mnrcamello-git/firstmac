import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, IonAlert, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { catchError, finalize, of } from 'rxjs';

type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule,
    IonSpinner, IonAlert, IonSearchbar, IonSelect, IonSelectOption, ProductCardComponent
  ],
})

export class HomePage implements OnInit {
  products: Product[] = [];
  // This is where I implemented the take-home requirement: Search Functionality: Implement a search bar that allows users to search for products by name.
  filteredProducts: Product[] = []; // Products after search/sort
  searchTerm = '';
  sortBy: SortOption = 'default';
  isLoading = false;
  error: string | null = null;
  

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Load products when page starts
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    // Call the API to get products
    this.productService.getProducts()
      .pipe(
        finalize(() => this.isLoading = false), // Always stop loading spinner
        catchError(err => {
          this.error = err.message || 'Failed to load products';
          return of([]); // Return empty array on error
        })
      )
      .subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = products; // Start with all products shown
        },
        error: err => {
          this.error = err.message || 'An unexpected error occurred';
        }
      });
  }

  // Handle search input changes
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase().trim();
    this.applyFilters(); // Update the displayed products
  }

  // Handle sort dropdown changes
  onSortChange(event: CustomEvent): void {
    this.sortBy = event.detail.value;
    this.applyFilters(); // Update the displayed products
  }

  // Apply both search and sort to the product list
  applyFilters(): void {
    let filtered = [...this.products]; // Start with all products
    
    // Filter by search term if user typed something
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm)
      );
    }
    
    // Apply sorting and update the display
    this.filteredProducts = this.sortProducts(filtered);
  }

  // Data Manipulation: Implement sorting functionality for the product list by price
  private sortProducts(products: Product[]): Product[] {
    // Different ways to sort the products
    const sortFunctions = {
      'price-low': (a: Product, b: Product) => a.price - b.price,
      'price-high': (a: Product, b: Product) => b.price - a.price,
      'name': (a: Product, b: Product) => a.name.localeCompare(b.name),
      'default': () => 0 // No sorting
    };

    // Get the right sorting function and apply it
    const sortFn = sortFunctions[this.sortBy as keyof typeof sortFunctions];
    return sortFn ? [...products].sort(sortFn) : products;
  }
}
