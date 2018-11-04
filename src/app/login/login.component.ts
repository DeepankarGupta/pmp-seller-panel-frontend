import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUserLoginRequest } from '../models/userLoginRequest';
import { IUser } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  validationMessages = {
    'id': [
      { type: 'required', message: 'id is required' }
    ],
    'password': [
      { type: 'required', message: 'password is required' }
    ]
  }
  serverSideErrors: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let userLoginRequest: IUserLoginRequest = this.loginForm.value
    this.userService.login(userLoginRequest)
      .subscribe(
        (user: IUser) => {
          localStorage.setItem('JWT',user.token)
          this.userService.setCurrentUser(user)
          this.router.navigate(['/home']);
        },
        // (error: HttpErrorResponse) => {
        //   this.loading = false;
        //   this.serverSideErrors = error.error.errors
        // }
        );
  }

}
