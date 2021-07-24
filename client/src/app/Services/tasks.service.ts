import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  AddTask(Task:any):Observable<any>{
    let Url ="users/register/user";
    return this.http.post<Observable<any>>(environment.APIBaseUrl +  Url , Task);
  }

}


