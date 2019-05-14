import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { OrderCategoriesComponent } from './order/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order/order-positions/order-positions.component';

const routes: Routes =[
    {path: '', component: AuthLayoutComponent, children: [
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent}
    ]},
    {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
        {path: 'overview', component: OverviewComponent},
        {path: 'analytics', component: AnalyticsComponent},
        {path: 'history', component: HistoryComponent},
        {path: 'order', component: OrderComponent, children: [
            {path: '', component: OrderCategoriesComponent},
            {path: ':id', component: OrderPositionsComponent}
        ]},
        {path: 'categories', component: CategoriesComponent},
        {path: 'categories/new', component: CategoriesFormComponent},
        {path: 'categories/:id', component: CategoriesFormComponent},
    ]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
