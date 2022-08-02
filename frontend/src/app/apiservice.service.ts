import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  // connect front to backend
  apiUrl = 'http://localhost:300/det';

  //get all data
  getAllData():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  //create data
  createData(data:any):Observable<any>{
     return this.http.post(`${this.apiUrl}`,data);
  }


  //delete data
  deleteData(id:any):Observable<any>{
    let ids=id;
     return this.http.delete(`${this.apiUrl}/${ids}`)
  }


  //update data
  updateData(data:any,id:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data);   //ids
  }


  //get single data
  getSingleData(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
}
