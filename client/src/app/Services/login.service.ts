import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginuser(createDefaultAdmin: { Email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  createDefaultAdmin (Email:"admin" , password:"admin"):Observable<any>{
  let Url ="users/login";
  return this.http.post<Observable<any>>(environment.APIBaseUrl +  Url , Email + password);
}
}

