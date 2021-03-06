import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/http';
import { LoginUser, User } from '../../../shared/shared.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  hideFilters;
  newUserEmail;
  userLoginData;

  constructor(private  httpClientService: HttpClientService) {}

  async register(email: string, name: string, password: string): Promise<any> {
    const user: { password: string; name: string; email: string } = {email: email, name: name, password: password};
    // @ts-ignore
    let resp = await this.httpClientService.onRegister(user);
    this.userExists();
    return resp;
  }

  async login(email: string, password: string): Promise<any> {
    let user: LoginUser = {email: email, password: password};
    let resp = await  this.httpClientService.onLogin(user);
    this.userData();
    return resp;
  }

  userExists() {
    this.newUserEmail = this.httpClientService.newUserEmail;
  }

  userData() {
    this.userLoginData = this.httpClientService.userLoginData;
  }
}
