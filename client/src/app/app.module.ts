import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { TokenIntercepter } from './shared/classes/token.intercepter';
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from './order/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order/order-positions/order-positions.component';
import { HistoryListComponent } from './history/history-list/history-list.component';
import { HistoryFilterComponent } from './history/history-filter/history-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    LoginComponent,
    OverviewComponent,
    AnalyticsComponent,
    HistoryComponent,
    OrderComponent,
    CategoriesComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenIntercepter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
