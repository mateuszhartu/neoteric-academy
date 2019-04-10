import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit, DoCheck {
  username: string = '';
  password: string = '';
  emptyEmail: boolean;
  emptyPassword: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute) {}
  ngOnInit() {
  }
  ngDoCheck() {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.username === '') {
          this.emptyEmail = true;
        } else {
          this.emptyEmail = false;
        }
        if (this.password === '') {
          this.emptyPassword = true;
        } else {
          this.emptyPassword = false;
        }
      }
    );
  }

  onLogin() {
    if (this.username === 'admin@gmail.com' && this.password === 'admin') {
      alert('You are logged as ' + this.username);
      this.router.navigate(['']);
    } else if (this.username === '' || this.password === '') {
      alert('Enter email and password');
    } else {
      alert('Wrong login or password');
    }
  }
  getEmailColor() {
    return this.emptyEmail === true ? 'red' : '';
  }
  getPasswordColor() {
    return this.emptyPassword === true ? 'red' : '';
  }
}
