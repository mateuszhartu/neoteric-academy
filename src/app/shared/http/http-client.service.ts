import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginUser, Offer, User } from '../shared.interface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable()
export class HttpClientService {
  // serverPath: string = 'https://justjoinit-backend.herokuapp.com';
  serverPath: string = 'http://localhost:5000';
  authorization: string = '/auth';
  register: string = '/register';
  login: string = '/login';
  offer: string = '/offers';
  newOffer: string = '/offers/new';
  token: string = 'token';
  newUserEmail;
  userLoginData;


  constructor(private http: HttpClient,
              private cookieServ: CookieService) {}

  async onRegister(user: User): Promise<any> {
    this.newUserEmail = true;
    let url = this.serverPath + this.authorization + this.register;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' });
    let options = { headers: headers};
    let resp = await this.http.post( url, JSON.stringify(user), options)
      .toPromise().catch((error: HttpErrorResponse) => {
        this.newUserEmail = false;
        alert('User with email ' + user.email + ' already exists');
        return error;
      });
    return resp;
  }

  async onLogin(user: LoginUser): Promise<any> {
    this.userLoginData = true;
    let url = this.serverPath + this.authorization + this.login;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' });
    let options = { headers: headers};
    let resp = await this.http.post( url, JSON.stringify(user), options)
      .toPromise().catch((error: HttpErrorResponse) => {
        this.userLoginData = false;
        return error;
      });
    if (!(resp instanceof HttpErrorResponse)) {
      let data = <{user: User, token: {expiresIn: number, token: string}}>
        resp.valueOf();
      this.cookieServ.set(this.token, data.token.token);
      // this.userToken = data.token.token;
      localStorage.setItem('userToken', data.token.token);
      // this.userID = data.user._id;
      localStorage.setItem('userID', data.user._id);
      // this.userName = data.user.name;
      localStorage.setItem('userName', data.user.name);
    }
    return resp;
  }

  public logout() {
    localStorage.clear();
  }

  async addOffer(offer: Offer): Promise<any> {
    let url = this.serverPath + this.newOffer;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': localStorage.getItem('userToken') });
    let options = { headers: headers };
    let resp = await this.http.post(url, JSON.stringify(offer), options)
      .toPromise().catch((error: HttpErrorResponse) => {
        return error;
      });
    console.log(resp);
    return resp;
  }

  async updateOffer(offer: Offer, id: string): Promise<any> {
    let url = this.serverPath + this.offer + `/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*',
    });
    let body = JSON.stringify(offer);
    let options = { headers: headers };
    return await this.http.patch(url, body, options)
      .toPromise();
  }

  deleteOffer(id: string): Observable<{}> {
    let url = this.serverPath + this.offer + `/${id}`;
    let headers = new HttpHeaders( {'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this.http.delete(url, options);
  }

  async getOffers(params: Array<string>): Promise<any> {
    let url = this.serverPath + this.offer;
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*',
    });
    let options = { headers: headers };
    let resp = await this.http.post(url, params, options)
      .toPromise().catch((error: HttpErrorResponse) => {
        return error;
      });
    // console.log(resp);
    return resp;
  }
}
