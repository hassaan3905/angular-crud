import { EmployeeServiceService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  name: string = '';
  salary: string = '';
  age: string = '';

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeeService
      .createEmployee(this.name, this.age, this.salary)
      .then((response) => {
        //        console.log(response);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
