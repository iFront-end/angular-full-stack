import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Order, Filter } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  aSub: Subscription;
  orders: Order[] = [];
  limit = 2;
  offset = 0;
  loading = false;
  reloading = false;
  noMoreOrders = false;
  filter: Filter = {};

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.aSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.aSub = this.ordersService.fetch(params).subscribe(
      (orders: Order[]) => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = this.limit > orders.length;
        this.loading = false;
        this.reloading = false;
      }
    )
  }

  loadMore() {
    this.offset += this.limit;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return 0 !== Object.keys(this.filter).length;
  }
}
