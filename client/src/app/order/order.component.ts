import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrderPosition, Order } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;
  isRoot: boolean;
  modal: MaterialInstance;
  aSubNav: Subscription;
  aSabReq: Subscription;
  pending = false;

  constructor(private router: Router, 
              private order: OrderService, 
              private ordersService: OrdersService) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.aSubNav = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.isRoot = this.router.url === '/order';
    });
  }

  ngOnDestroy() {
    this.aSubNav && this.aSubNav.unsubscribe();
    this.aSabReq && this.aSabReq.unsubscribe();
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  onSubmit() {
    this.pending = true;
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;

        return item;
      })
    };

    this.aSabReq = this.ordersService.create(order).subscribe(
      (newOrder: Order) => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен`);
        this.order.clear();
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      }
    );
  }
}
