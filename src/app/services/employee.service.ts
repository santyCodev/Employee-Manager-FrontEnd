import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from '../shared/defines';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    const url = API_URLS.getEmployees;
    return this.http.get<Employee[]>(url);
  }

  public getEmployeeById(employeeId: number): Observable<Employee[]> {
    const url = API_URLS.getEmployeeById.replace('{id}',employeeId.toString());;
    return this.http.get<Employee[]>(url);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    const url = API_URLS.addEmployee;
    return this.http.post<Employee>(url, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    const url = API_URLS.updateEmployee;
    return this.http.put<Employee>(url, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    const url = API_URLS.deleteEmployee.replace('{id}',employeeId.toString());
    return this.http.delete<void>(url);
  }
}
