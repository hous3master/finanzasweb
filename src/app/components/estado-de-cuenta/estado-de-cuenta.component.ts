import { Component, OnInit } from '@angular/core';
import { Infocontable } from 'src/app/models/Infocontable';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-estado-de-cuenta',
  templateUrl: './estado-de-cuenta.component.html',
  styleUrls: ['./estado-de-cuenta.component.css'],
})
export class EstadoDeCuentaComponent implements OnInit {
  infocontable: Infocontable = new Infocontable();

  constructor(
    private infocontableService: InfocontableService,
    private usersService: UsersService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((user) => {
        // return first info contable of user
        console.log('User: ', user);
        this.infocontableService.list().subscribe((infocontables) => {
          infocontables.forEach((infocontable: Infocontable) => {
            if (infocontable.user.id == user.id) {
              this.infocontable = infocontable;
              console.log('infocontable: ', this.infocontable);
            }
          });
        });
      });
  }
}
