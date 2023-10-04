import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'budget', component: BudgetComponent},
  { path: 'transactions', component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
