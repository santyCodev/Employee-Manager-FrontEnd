import { environment } from "src/environments/environment";

export const API_URLS = {
    'getEmployees': environment.apiServerUrlLocal + '/employee',
    'getEmployeeById': environment.apiServerUrlLocal + '/employee/{id}',
    'addEmployee': environment.apiServerUrlLocal + '/employee',
    'updateEmployee': environment.apiServerUrlLocal + '/employee',
    'deleteEmployee': environment.apiServerUrlLocal + '/employee/{id}',
}