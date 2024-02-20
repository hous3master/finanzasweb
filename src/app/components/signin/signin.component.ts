import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  implements OnInit {
  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password1: string = '';
  password2: string = '';
  mensaje: string = '';
  
  ngOnInit() {
    if (this.loginService.verificar()) {
      this.router.navigate(['/']);
    }
  }

  signin() {
    // Check if passwords match
    if (this.password1 != this.password2) {
      this.mensaje = '¡Las contraseñas no coinciden!';
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      return;
    }
    // Check if username is empty
    if (this.username == '') {
      this.mensaje = '¡El nombre de usuario no puede estar vacío!';
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      return;
    }
    // Check if password is empty
    if (this.password1 == '') {
      this.mensaje = '¡La contraseña no puede estar vacía!';
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      return;
    }
    // Register user
    let user: Users = new Users();
    user.enabled = true;
    user.password = this.password1;
    user.username = this.username;
    this.usersService.insert(user).subscribe(
      (data: any) => {
        this.mensaje = '¡Usuario registrado con éxito!';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
        this.login();
      },
      (error) => {
        this.mensaje = '¡El nombre de usuario ya está en uso!';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      }
    );
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password1;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        if (this.loginService.showRole() == 'ADMIN') {
          this.router.navigate(['components/registrodatos']);
        } else if (this.loginService.showRole() == 'USER') {
          this.router.navigate(['components/registrodatos']);
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
