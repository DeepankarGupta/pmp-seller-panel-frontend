import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  validationMessages = {
    'companyName': [{ type: 'required', message: 'company name  is required' }],
    'ownerName': [{ type: 'required', message: 'owner name  is required' }],
    'address': [{ type: 'required', message: 'addredd is required' }],
    'phoneNumber': [{ type: 'required', message: 'contact number  is required' }],
    'gstNumber': [{ type: 'required', message: 'GST number  is required' }],
    'email': [
      { type: 'required', message: 'email is required' },
      { type: 'email', message: 'enter a valid email' }
    ],
    'password': [{ type: 'required', message: 'password is required' }]
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.registerForm = this.formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      ownerName: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      gstNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

    
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login'])
      }
    )
  }

}
