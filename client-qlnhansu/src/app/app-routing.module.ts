import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { CareerListComponent } from './component/career-list/career-list.component';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { CareerDetailsComponent } from './component/career-details/career-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'career', component: CareerListComponent },
  { path: 'career/:id', component: CareerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
