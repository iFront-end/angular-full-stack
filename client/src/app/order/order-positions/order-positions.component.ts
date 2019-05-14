import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from 'src/app/shared/services/position.service';
import { switchMap, map } from 'rxjs/operators';
import { Position } from 'src/app/shared/interfaces';
import { OrderService } from 'src/app/order/order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute, 
              private positionsService: PositionService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params['id']);
        }
      ),
      map(
        (positions: Position[]) => {
          return positions.map((position: Position) => {
            position.quantity = 1;

            return position;
          });
        }
      )
    )
  }

  addToOrder(position: Position) {
    if (0 > position.quantity) return;
    
    MaterialService.toast(`Добавлено: ${position.name} в кол-ве ${position.quantity} шт.`);
    this.orderService.addPosition(position);
  }
}
