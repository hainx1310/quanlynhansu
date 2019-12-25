import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8182/api/employees';

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: string, value: any): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPageEmployee(pageIdx: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${pageIdx}&size=${pageSize}`);
  }

  getPageEmployeeSorted(pageIdx: number, pageSize: number, propertiesSort: string, typeSort: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${pageIdx}&size=${pageSize}&propertieSort=${propertiesSort}&typeSort=${typeSort}`);
  }

  searchEmployeeByFirstName(pageIdx: number, pageSize: number, firstName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?keywords=${firstName}&page=${pageIdx}&size=${pageSize}`);
  }
}
