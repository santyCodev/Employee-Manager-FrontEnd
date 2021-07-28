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

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    switch(mode) {
      case 'add':     button.setAttribute('data-bs-target', '#addEmployeeModal'); break;
      case 'edit':    button.setAttribute('data-bs-target', '#updateEmployeeModal'); break;
      case 'delete':  button.setAttribute('data-bs-target', '#deleteEmployeeModal'); break;
    }
    container?.appendChild(button);
    button.click();
  }
}
