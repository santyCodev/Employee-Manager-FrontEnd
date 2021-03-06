import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './model/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;
  public errorMessage: string = '';

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
      }
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe((res: Employee) => {
      console.log(res);
      this.getEmployees();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
      addForm.reset();
    });    
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe((res: Employee) => {
      console.log(res);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    });    
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((res: void) => {
      console.log(res);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    });    
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    this.employees.forEach(employee => {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    });
    this.employees = results;
    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    switch(mode) {
      case 'add':     
        button.setAttribute('data-bs-target', '#addEmployeeModal'); 
        break;
      case 'edit':    
        this.editEmployee = employee;
        button.setAttribute('data-bs-target', '#updateEmployeeModal'); 
        break;
      case 'delete':  
        this.deleteEmployee = employee;
        button.setAttribute('data-bs-target', '#deleteEmployeeModal');
        break;
    }
    container?.appendChild(button);
    button.click();
  }
}
