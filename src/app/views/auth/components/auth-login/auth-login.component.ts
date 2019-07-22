import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  buttonCanDisplay;
  hideFilters = true;
  passwordPattern = '[a-z].*[0-9]|[0-9].*[a-z]';
  emailPattern = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';

  angForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.createForm();
    }

  createForm() {
    this.angForm = this.formBuilder.group({
        email: ['', Validators.required ],
        password: ['', Validators.required ]
      }
    );
  }
  ngOnInit() {
    this.buttonCanDisplay = false;
    this.authService.hideFilters = this.hideFilters;
  }

  async onLogin() {
    if (this.username === 'admin@gmail.com' && this.password === 'adminadmin1234') {
      alert('You are logged as ' + this.username);
      }
    await this.authService.login(this.username, this.password);

    if (this.authService.userLoginData === true) {
      this.router.navigate(['']);
    } else {
      alert('Wrong email or password');
    }
  }
}
