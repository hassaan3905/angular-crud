import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://dummy.restapiexample.com/api/v1';

  fetchEmployees() {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  createEmployee(name, age, salary) {
    const payload = {
      name,
      age,
      salary,
    };
    return this.http
      .post(`${this.apiUrl}/create`, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
  }

  deleteEmployee(id) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).toPromise();
  }

  fetchEmployeeById(id) {
    return this.http.get(`${this.apiUrl}/employee/${id}`);
  }

  updateEmployee(id, dataObj) {
    return this.http
      .put(`${this.apiUrl}/update/${id}`, dataObj, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
  }
}
