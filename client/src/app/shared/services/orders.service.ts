import { Injectable } from '@angular/core';
import { Order } from '../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private http: HttpClient){
    }

    fetch(params: any = {}): Observable<Order[]> {
        return this.http.get<Order[]>('/api/order', {
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    create(order: Order): Observable<Order> {
        return this.http.post<Order>('/api/order', order);
    }
}