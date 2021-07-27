import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public errorMessage: string = '';
  public showErrorMessage: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      if(res.length !== 0) {
        this.employees = res;
      }
      else {
        this.errorMessage = "No employees";
        this.showErrorMessage = true;
      }
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
    });
  }
}
