import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.interface';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 199,
    description: 'Test product description',
    discount: 15
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.product = mockProduct;
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('ion-card-title'));
    const descriptionElement = fixture.debugElement.query(By.css('.description'));
    const priceElement = fixture.debugElement.query(By.css('.price'));

    expect(titleElement.nativeElement.textContent).toBe('Test Product');
    expect(descriptionElement.nativeElement.textContent).toBe('Test product description');
    expect(priceElement.nativeElement.textContent).toBe('$199');
  });

  it('should show discount badge when discount > 0', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const discountElement = fixture.debugElement.query(By.css('.discount'));
    expect(discountElement).toBeTruthy();
    expect(discountElement.nativeElement.textContent).toBe('15% OFF');
  });

  it('should hide discount badge when discount is 0', () => {
    const productWithoutDiscount: Product = {
      ...mockProduct,
      discount: 0
    };
    component.product = productWithoutDiscount;
    fixture.detectChanges();

    const discountElement = fixture.debugElement.query(By.css('.discount'));
    expect(discountElement).toBeFalsy();
  });

  it('should return correct hasDiscount value', () => {
    component.product = mockProduct;
    expect(component.hasDiscount).toBe(true);

    component.product = { ...mockProduct, discount: 0 };
    expect(component.hasDiscount).toBe(false);
  });

  it('should format price correctly', () => {
    component.product = mockProduct;
    expect(component.formattedPrice).toBe('$199');

    component.product = { ...mockProduct, price: 0 };
    expect(component.formattedPrice).toBe('$0');
  });

  it('should handle null product gracefully', () => {
    component.product = null as any;
    expect(component.hasDiscount).toBe(false);
    expect(component.formattedPrice).toBe('$0');
  });
});
