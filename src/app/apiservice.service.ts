import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly userUrl = "https://localhost:7093/api/User";

  constructor(private http:HttpClient) { }

  getAllUser():Observable<any[]>{
    return this.http.get<any[]>(this.userUrl+"/GetAll");
  }
  addUser(user:any):Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.userUrl + '/CreateUser', user, httpOptions);
  }
  updateUser(userid:any,user: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.userUrl + '/UpdateUser?id='+userid, user, httpOptions);
  }
  deleteUser(userid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.userUrl + '/RemoveUser?id=' + userid, httpOptions);
  }
}
