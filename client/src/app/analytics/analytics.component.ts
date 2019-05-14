import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  average: number;
  pending = true;
  aSub: Subscription;

  constructor(private service: AnalyticsService) { }

  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe();
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;
      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';

      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      orderCtx.canvas.height = '300px';

      new Chart(gainCtx, this.createChartConfig(gainConfig));
      new Chart(orderCtx, this.createChartConfig(orderConfig));
      this.pending = false;
    });
  }

  createChartConfig({labels, data, label, color}) {
    return {
      type: 'line',
      options: {
        responsive: true
      },
      data: {
        labels,
        datasets: [
          {
            label, data,
            borderColor: color,
            steppedLine: false,
            fill: false
          }
        ]
      }
    }
  }
}
