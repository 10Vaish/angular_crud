import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLogin:boolean=false;
  iscorrect:boolean=false;
  private baseURL="http://localhost:8080/api/v1/students";
  private logURL="http://localhost:8080/api/v1/login";
  constructor(private httpClient:HttpClient) { }

  postProduct(data:any):Observable<any>{
    return this.httpClient.post<any>(this.baseURL,data);
  }
  getProduct():Observable<any>{
    return this.httpClient.get<any>(this.baseURL);
  }
  putStudent(data:any,id:number):Observable<any>{
    return this.httpClient.put<any>(`${this.baseURL}/${id}`,data);
  }
  deleteStudent(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`);
  }
  loginValidate(data:any):Observable<any>{
    return this.httpClient.post<any>(this.logURL,data);
  }
}
