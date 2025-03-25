import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


const Error = {
  username: {
    pattern: 'Username should not contain any special characters'
  },
  password: {
    pattern: 'Password must contain a minimum of 6 characters includes atleast 1 alphanumeric and special character'
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errMsg:string[] = [];

  loginForm: FormGroup;

  constructor(private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[\w\s]+$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])
    })
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errMsg = [];
      if (!this.loginForm.get('username')?.valid) {
        this.errMsg.push(Error.username.pattern);
      }
      if (!this.loginForm.get('password')?.valid) {
        this.errMsg.push(Error.password.pattern);
      }
    } else {
      this.errMsg = [];
      console.log(this.loginForm.value);
      this.loginForm.reset();
      alert('Login Successfully');
      this.router.navigate(['/dashboard']);
    }
  }
}
