import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserLoginRequest } from './models/userLoginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "localhost:8080/api/seller";
  private currentUser = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) { }

  login(userLoginRequest: IUserLoginRequest) {
    console.log(userLoginRequest.id)
    console.log(userLoginRequest.password)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + "/login", userLoginRequest, httpOptions)
  }

  setCurrentUser(user: IUser) {
    this.currentUser.next(user);
  }

  register(newUserRequest: any) {
   return this.http.post(this.baseUrl + "/register", newUserRequest)
  }
}
