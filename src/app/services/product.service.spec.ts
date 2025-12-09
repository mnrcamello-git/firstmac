import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Description for Product 1',
        discount: 10
      },
      {
        id: 2,
        name: 'Product 2',
        price: 150,
        description: 'Description for Product 2',
        discount: 0
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3001/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle HTTP error', () => {
    service.getProducts().subscribe({
      next: () => fail('should have failed with network error'),
      error: (error) => {
        expect(error.message).toBe('Network connection failed');
      }
    });

    const req = httpMock.expectOne('http://localhost:3001/products');
    req.flush('Network error', { status: 0, statusText: 'Unknown Error' });
  });

  it('should handle server error', () => {
    service.getProducts().subscribe({
      next: () => fail('should have failed with server error'),
      error: (error) => {
        expect(error.message).toBe('Server error occurred');
      }
    });

    const req = httpMock.expectOne('http://localhost:3001/products');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
