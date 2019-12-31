import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career } from '../model/Career';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private baseUrl = 'http://localhost:8182/api/career';

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getCareerById(id: string): Observable<Career> {
    return this.http.get<Career>(`${this.baseUrl}/${id}`);
  }

  createCareer(career: Object): Observable<Career> {
    return this.http.post<Career>(`${this.baseUrl}`, career);
  }

  updateCareer(id: string, value: any): Observable<Career> {
    return this.http.put<Career>(`${this.baseUrl}/${id}`, value);
  }

  deleteCareer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllCareer(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPageCareer(pageIdx: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${pageIdx}&size=${pageSize}`);
  }

  getPageCareerSorted(pageIdx: number, pageSize: number, propertiesSort: string, typeSort: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${pageIdx}&size=${pageSize}&propertieSort=${propertiesSort}&typeSort=${typeSort}`);
  }

  searchCareerByName(pageIdx: number, pageSize: number, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?keywords=${name}&page=${pageIdx}&size=${pageSize}`);
  }

  addEmployeeToCareer(employeeIds: string, careerId: string): Observable<any> {
    return this.http.post(`http://localhost:8182/api/careerEmployee/addEmployees/${careerId}/${employeeIds}`, {careerId, employeeIds});
  }
}
