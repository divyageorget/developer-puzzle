import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { STOCKCONSTANTS } from '../../../../util/src/lib/stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = [
    { viewValue: STOCKCONSTANTS.ALL, value: STOCKCONSTANTS.ALL_VALUE },
    {
      viewValue: STOCKCONSTANTS.FIVE_YEAR,
      value: STOCKCONSTANTS.FIVE_YEAR_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.TWO_YEAR,
      value: STOCKCONSTANTS.TWO_YEAR_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.ONE_YEAR,
      value: STOCKCONSTANTS.ONE_YEAR_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.YEAR_TO_DATE,
      value: STOCKCONSTANTS.YEAR_TO_DATE_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.SIX_MONTH,
      value: STOCKCONSTANTS.SIX_MONTH_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.THRESS_MONTH,
      value: STOCKCONSTANTS.THRESS_MONTH_VALUE
    },
    {
      viewValue: STOCKCONSTANTS.ONE_MONTH,
      value: STOCKCONSTANTS.ONE_MONTH_VALUE
    }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
