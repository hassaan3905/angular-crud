import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmployeeListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: EmployeeCreateComponent,
  },
  {
    path: 'update/:id',
    pathMatch: 'full',
    component: EmployeeUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
