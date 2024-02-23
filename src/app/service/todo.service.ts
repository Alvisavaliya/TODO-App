import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee }from '../model/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  serviceURL: string;

  constructor(private http:HttpClient) { 
      this.serviceURL="http://localhost:3000/data"
  }


  addData(data:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.serviceURL,data)
  }
   getAllData()
    {
      return this.http.get<Employee[]>(this.serviceURL)
    }
    DeleteData(data:Employee):Observable<Employee>
    {
      return this.http.delete<Employee>(this.serviceURL+'/'+ data.id)
    }

    EditData(data:Employee):Observable<Employee>
    {
      return this.http.put<Employee>(this.serviceURL+'/'+data.id, data)
    }
}
