import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Infocontable } from 'src/app/models/Infocontable';
import { Historial } from 'src/app/models/historial';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alterar-flujo-de-fondos',
  templateUrl: './alterar-flujo-de-fondos.component.html',
  styleUrls: ['./alterar-flujo-de-fondos.component.css'],
})
export class AlterarFlujoDeFondosComponent implements OnInit {
  mensaje: string = '';
  form: FormGroup = new FormGroup({});

  infocontable: Infocontable = new Infocontable();

  constructor(
    private formBuilder: FormBuilder,
    private infoContableService: InfocontableService,
    private loginService: LoginService,
    private usersService: UsersService,
    private historialService: HistorialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipo: ['', Validators.required],
      fondos: ['', Validators.required],
    });

    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((user) => {
        // return first info contable of user
        console.log('User: ', user);
        this.infoContableService.list().subscribe((infocontables) => {
          infocontables.forEach((infocontable: Infocontable) => {
            if (infocontable.user.id == user.id) {
              this.infocontable = infocontable;
              this.infocontable.fechainicio = new Date(
                this.infocontable.fechainicio
              );
              this.infocontable.fechafin = new Date(this.infocontable.fechafin);
            }
          });
        });
      });
  }

  aceptar(): void {
    if (this.form.valid) {
      let variacion = this.form.value.fondos;
      if (this.form.value.tipo === 'retirar') {
        variacion = variacion * -1;
        console.log('variacion ', variacion);
      }
      console.log('valorpresente pre ', this.infocontable.valorpresente);
      this.infocontable.valorpresente =
        this.infocontable.valorpresente + variacion;
      console.log('valorpresente pos ', this.infocontable.valorpresente);

      this.valorfuturoAtasaefectiva();
      this.registrar();

      this.router.navigate(['/components/estadodecuenta']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  valorfuturoAtasaefectiva(): void {
    let diff = Math.abs(
      this.infocontable.fechafin.getTime() -
        this.infocontable.fechainicio.getTime()
    );
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log('diffDays: ', diffDays);

    let base = 1 + this.infocontable.tasaefectiva;
    console.log('base: ', base);

    this.infocontable.valorfuturo =
      this.infocontable.valorpresente *
      Math.pow(base, diffDays / this.infocontable.plazodias);
  }

  registrar(): void {
    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((data) => {
        console.log('Infocontable: ', this.infocontable);

        this.infoContableService.update(this.infocontable).subscribe(() => {
          this.infoContableService.list().subscribe((data) => {
            this.infoContableService.setList(data);
          });
        });

        let historial: Historial = new Historial();
        historial.fecha = new Date();
        let variacion = this.form.value.fondos;
        if (this.form.value.tipo === 'retirar') {
          variacion = variacion * -1;
          console.log('variacion ', variacion);
        }
        historial.monto = variacion;
        historial.user.id = data.id;

        this.historialService.insert(historial).subscribe(() => {
          this.historialService.list().subscribe((data) => {
            this.historialService.setList(data);
          });
        });
      });
  }
}
