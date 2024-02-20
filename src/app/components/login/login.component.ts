import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  role: string = '';
  mensaje: string = '';
  
  ngOnInit() {
    if (this.loginService.verificar()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        if (this.loginService.showRole() == 'ADMIN') {
          this.router.navigate(['components/estadodecuenta']);
        } else if (this.loginService.showRole() == 'USER') {
          this.router.navigate(['components/estadodecuenta']);
        }
      },
      (error) => {
        this.mensaje =
          '¡Credenciales incorrectas! Revise su información e intente de nuevo.';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      }
    );
  }
}
