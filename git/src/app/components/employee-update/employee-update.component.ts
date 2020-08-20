import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit, OnDestroy {
  name: string = '';
  age: string = '';
  salary: string = '';
  id: string = '';

  paramSubscription: Subscription;
  requestSubscription: Subscription;
  constructor(
    private employeeService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((data) => {
      console.log(data);
      this.id = data.id;
      this.requestSubscription = this.employeeService
        .fetchEmployeeById(data.id)
        .subscribe(
          (response: any) => {
            console.log(response);
            const data = response.data;
            this.name = data.employee_name;
            this.age = data.employee_age;
            this.salary = data.employee_salary;
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onUpdate() {
    const data = {
      name: this.name,
      age: this.age,
      salary: this.salary,
    };
    this.employeeService
      .updateEmployee(this.id, data)
      .then((response) => {
        this.router.navigate(['/']);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.requestSubscription.unsubscribe();
  }
}
