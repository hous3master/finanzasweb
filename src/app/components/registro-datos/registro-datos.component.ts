import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Infocontable } from 'src/app/models/Infocontable';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.component.html',
  styleUrls: ['./registro-datos.component.css'],
})
export class RegistroDatosComponent implements OnInit {
  mensaje: string = '';
  form: FormGroup = new FormGroup({});

  valorpresente: number = 0;
  plazoDeTasaEfectiva: number = 0; // numero representa dias, por ejemplo 360 es anual
  tasaefectiva: number = 0;
  fechaInicial: Date = new Date();
  fechafin: Date = new Date();
  valorfuturo: number = 0;

  infocontable: Infocontable = new Infocontable();

  constructor(
    private formBuilder: FormBuilder,
    private infoContableService: InfocontableService,
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      valorpresente: ['', Validators.required],
      prePlazoDeTasaEfectiva: ['360', Validators.required],
      plazoDeTasaEfectiva: ['360', Validators.required],
      tasaefectiva: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechafin: ['', Validators.required],
    });

    this.form.get('prePlazoDeTasaEfectiva')?.valueChanges.subscribe((newValue) => {
      // update the value in the form
      this.form.patchValue({
        plazoDeTasaEfectiva: parseInt(newValue),
      });
      // if the value is not especial (0), the disable editing
      if (parseInt(this.form.get('plazoDeTasaEfectiva')?.value) == 0 ) {
        this.form.get('plazoDeTasaEfectiva')?.enable();
      }
      else {
        this.form.get('plazoDeTasaEfectiva')?.disable();
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.valorpresente = this.form.value.valorpresente;
      this.plazoDeTasaEfectiva = this.form.value.plazoDeTasaEfectiva;
      this.tasaefectiva = this.form.value.tasaefectiva / 100; // Convertir a porcentaje
      
      this.fechaInicial = this.form.value.fechaInicial;
      this.fechafin = this.form.value.fechafin;

      this.valorfuturoAtasaefectiva();
      this.registrar();

      // change router to /components/estadodecuenta
      this.router.navigate(['/components/estadodecuenta']);

      
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  valorfuturoAtasaefectiva(): void {
    // calcular diferenca de dias entre fechaInicial y fechafin
    let diff = Math.abs(
      this.fechafin.getTime() - this.fechaInicial.getTime()
    );
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log('diffDays: ', diffDays);

    let base = 1 + this.tasaefectiva;
    console.log('base: ', base);

    // calcular valor futuro
    this.valorfuturo =
      this.valorpresente * Math.pow(base, diffDays / this.plazoDeTasaEfectiva);
  }

  consoleLog(): void {
    console.log('valorpresente: ', this.valorpresente);
    console.log('plazoDeTasaEfectiva: ', this.plazoDeTasaEfectiva);
    console.log('tasaefectiva: ', this.tasaefectiva);
    console.log('fechaInicial: ', this.fechaInicial);
    console.log('fechafin: ', this.fechafin);
    console.log('valorfuturo: ', this.valorfuturo);
  }

  registrar(): void {
    this.infocontable.fechafin = this.fechafin;
    this.infocontable.fechainicio = this.fechaInicial;
    this.infocontable.plazodias = this.plazoDeTasaEfectiva;
    this.infocontable.tasaefectiva = this.tasaefectiva;
    this.infocontable.valorpresente = this.valorpresente;
    this.infocontable.valorfuturo = this.valorfuturo;

    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((data) => {
        this.infocontable.user.id = data.id;
        console.log('Infocontable: ', this.infocontable);

        this.infoContableService.insert(this.infocontable).subscribe(() => {
          this.infoContableService.list().subscribe((data) => {
            this.infoContableService.setList(data);
          });
        });
      });
  }
}
