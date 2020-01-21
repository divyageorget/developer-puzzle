import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: PriceQueryFacade,
          useValue: {
            priceQueries$: {},
            fetchQuote: () => {}
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = TestBed.get(PriceQueryFacade);
    spyOn(priceQueryFacade, 'fetchQuote');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call fetchQuote on valueChange', () => {
      component.ngOnInit();
      component.stockPickerForm.valueChanges.subscribe(() => {
        expect(component.fetchQuote).toBeCalled();
      });
    });
  });

  describe('fetchQuote()', () => {
    it('should call fetchQuote of priceQueryFacade', () => {
      component.stockPickerForm.setValue({ symbol: 'AAPL', period: '6m' });
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalled();
    });
    it('should not call fetchQuote of priceQueryFacade', () => {
      component.stockPickerForm.setValue({ symbol: null, period: '6m' });
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).not.toHaveBeenCalled();
    });
  });
});
