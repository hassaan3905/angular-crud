import { Subscription } from 'rxjs';
import { IEmployee } from './../../models/employee';
import { EmployeeServiceService } from './../../services/employee-service.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import Chartjs from 'chart.js';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private employeeService: EmployeeServiceService) {}

  requestSubscription: Subscription;
  employees: IEmployee[] = [];
  @ViewChild('myChart', { static: false }) myChartEl: ElementRef<
    HTMLCanvasElement
  >;
  chart: any;

  chartConfig = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  ngOnInit(): void {
    // const ctx = this.myChartEl.getContext('2d');
    // this.chart = new Chartjs(ctx, this.chartConfig);
    this.requestSubscription = this.employeeService.fetchEmployees().subscribe(
      (response: any) => {
        this.employees = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    console.log(this.myChartEl);
    const ctx = this.myChartEl.nativeElement;
    this.chart = new Chartjs(ctx, this.chartConfig);
    console.log(this.chart);
  }

  onDelete(id) {
    // const newEmps = this.employees.filter((emp) => {
    //   return emp.id !== id;
    // });

    // this.employees = newEmps;

    this.employeeService
      .deleteEmployee(id)
      .then((response) => {
        const newEmps = this.employees.filter((emp) => {
          return emp.id !== id;
        });

        this.employees = newEmps;

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.requestSubscription.unsubscribe();
  }
}
