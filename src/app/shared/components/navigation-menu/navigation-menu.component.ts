import {Component, DoCheck, OnInit} from '@angular/core';
import { AppRouterUrls } from '../../../app-routing.config';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../../views/auth/services';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements DoCheck {
  appRouterUrls = AppRouterUrls;
  userLogged: boolean = false;
  userName: string = '';

    constructor(private sharedService: SharedService,
              private authService: AuthService) {
    }

    ngDoCheck() {
      this.sharedService.getUserName();
      this.userName = this.sharedService.userName;
      if (this.userName !== '') {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    }

    onClick() {
      this.sharedService.onClick();
    }

    hideFilters() {
      this.authService.hideFilters = true;
    }
  }
