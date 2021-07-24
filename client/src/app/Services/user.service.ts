import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) { }

  GetAllUsers():Observable<any>{
    let Url ="users/all";
    return this.http.get<Observable<any>>(environment.APIBaseUrl + Url);
  }
}
