import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';
import { of, throwError } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'iPhone',
      price: 999,
      description: 'Smartphone',
      discount: 10
    },
    {
      id: 2,
      name: 'Samsung',
      price: 799,
      description: 'Android phone',
      discount: 0
    },
    {
      id: 3,
      name: 'iPad',
      price: 599,
      description: 'Tablet',
      discount: 15
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: ProductService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when loading products', () => {
    const errorMessage = 'Failed to load products';
    mockProductService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));

    component.ngOnInit();

    expect(component.error).toBe(errorMessage);
    expect(component.isLoading).toBe(false);
    expect(component.products).toEqual([]);
  });

  it('should filter products by search term', () => {
    component.products = mockProducts;
    component.searchTerm = 'iphone';

    component.applyFilters();

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('iPhone');
  });

  it('should sort products by price low to high', () => {
    component.products = mockProducts;
    component.sortBy = 'price-low';

    component.applyFilters();

    expect(component.filteredProducts[0].price).toBe(599);
    expect(component.filteredProducts[1].price).toBe(799);
    expect(component.filteredProducts[2].price).toBe(999);
  });

  it('should sort products by price high to low', () => {
    component.products = mockProducts;
    component.sortBy = 'price-high';

    component.applyFilters();

    expect(component.filteredProducts[0].price).toBe(999);
    expect(component.filteredProducts[1].price).toBe(799);
    expect(component.filteredProducts[2].price).toBe(599);
  });

  it('should sort products by name', () => {
    component.products = mockProducts;
    component.sortBy = 'name';

    component.applyFilters();

    expect(component.filteredProducts[0].name).toBe('iPad');
    expect(component.filteredProducts[1].name).toBe('iPhone');
    expect(component.filteredProducts[2].name).toBe('Samsung');
  });

  it('should combine search and sort', () => {
    component.products = mockProducts;
    component.searchTerm = 'i';
    component.sortBy = 'price-low';

    component.applyFilters();

    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts[0].name).toBe('iPad');
    expect(component.filteredProducts[1].name).toBe('iPhone');
  });
});
