import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Infocontable } from './models/Infocontable';
import { UsersService } from './services/users.service';
import { InfocontableService } from './services/Infocontable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  role: string = '';
  username: string = '';
  infocontable: Infocontable = new Infocontable();

  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
  }

  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.username = this.loginService.showUser();
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'ADMIN' || this.role == 'USER') {
      return true;
    } else {
      return false;
    }
  }

  // return true if current page is not login
  validarPagina() {
    if (location.pathname == '/login' || location.pathname == '/signin') {
      return false;
    } else {
      return true;
    }
  }
}
