import {Component, DoCheck, OnInit} from '@angular/core';
import { AppRouterUrls } from '../../../app-routing.config';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../../views/auth/services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements DoCheck{
  appRouterUrls = AppRouterUrls;
  userLogged: boolean = false;

  constructor(private sharedService: SharedService,
              private authService: AuthService) {
  }

  ngDoCheck() {
    console.log(this.sharedService.userName);
    if (this.sharedService.userName !== '') {
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }

  onClick() {
    this.sharedService.onClick();
    this.authService.hideFilters = true;
  }

  onLogout() {
    this.sharedService.logout();
  }
}
