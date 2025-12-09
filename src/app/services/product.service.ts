import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // This is where I implemented the take-home requirement: API Integration: Use a provided mock API endpoint to fetch the list of products. Using JSON Server for dynamic API simulation.
  private readonly apiUrl = 'http://localhost:3001/products';

  constructor(private http: HttpClient) {}

  // Simple GET request to fetch all products
  getProducts(): Observable<Product[]> {
    // This is where I implemented the take-home requirement: Implement an Angular service to handle API calls.
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  // Handle different types of HTTP errors
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Something went wrong';
    
    // Check what kind of error we got
    if (error.status === 0) {
      errorMessage = 'Network connection failed';
    } else if (error.status >= 500) {
      errorMessage = 'Server error occurred';
    } else if (error.status === 404) {
      errorMessage = 'Products not found';
    }
    
    console.error('ProductService error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
