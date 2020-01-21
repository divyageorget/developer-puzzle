import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { subYears, format } from 'date-fns';
import { STOCKCONSTANTS } from './stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  fromDate: Date;
  toDate: Date;
  minDate: Date = subYears(new Date(), STOCKCONSTANTS.YEARS_5);
  currentDate = new Date();

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(
        symbol,
        STOCKCONSTANTS.MAX,
        format(fromDate, STOCKCONSTANTS.DATE_FORMAT),
        format(toDate, STOCKCONSTANTS.DATE_FORMAT)
      );
    }
  }

  changeDate() {
    const { symbol, fromDate, toDate } = this.stockPickerForm.value;
    if (toDate && fromDate && toDate < fromDate) {
      this.stockPickerForm.setValue({
        symbol: symbol,
        fromDate: toDate,
        toDate: toDate
      });
    }
  }
}
