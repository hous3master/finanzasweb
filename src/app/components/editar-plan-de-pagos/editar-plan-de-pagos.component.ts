import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Infocontable } from 'src/app/models/Infocontable';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-editar-plan-de-pagos',
  templateUrl: './editar-plan-de-pagos.component.html',
  styleUrls: ['./editar-plan-de-pagos.component.css'],
})
export class EditarPlanDePagosComponent implements OnInit {
  mensaje: string = '';
  form: FormGroup = new FormGroup({});

  valorpresente: number = 0;
  plazoDeTasaEfectiva: number = 0; // numero representa dias, por ejemplo 360 es anual
  tasaefectiva: number = 0;
  fechaInicial: Date = new Date();
  fechafin: Date = new Date();
  valorfuturo: number = 0;

  infocontable: Infocontable = new Infocontable();

  isDisabled = true;

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
      prePlazoDeTasaEfectiva: ['', Validators.required],
      plazoDeTasaEfectiva: ['', Validators.required],
      tasaefectiva: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechafin: ['', Validators.required],
    });

    this.llenarFormulario();

    

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

  disableAll(): void {
  }

  enableAll(): void {
    this.form.get('valorpresente')?.enable();
    this.form.get('fechaInicial')?.enable();
    this.form.get('plazoDeTasaEfectiva')?.enable();
  }

  aceptar(): void {
    if (this.form.valid) {
      this.enableAll();

      this.valorpresente = this.form.value.valorpresente;

      // also to avoid date problems with java (its start with 0 idkwhy)
      let fechaInicial = new Date(this.form.value.fechaInicial);
      fechaInicial.setDate(fechaInicial.getDate());
      this.fechaInicial = fechaInicial;

      this.plazoDeTasaEfectiva = this.form.value.plazoDeTasaEfectiva;
      this.tasaefectiva = this.form.value.tasaefectiva / 100; // Convertir a porcentaje

      // also to avoid date problems with java (its start with 0 idkwhy)
      let fechafin = new Date(this.form.value.fechafin);
      fechafin.setDate(fechafin.getDate());
      this.fechafin = fechafin;

      this.valorfuturoAtasaefectiva();
      this.registrar();

      this.router.navigate(['/components/estadodecuenta']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  llenarFormulario(): void {
    // get user id
    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((data) => {
        this.infocontable.user.id = data.id;
        // get the first infoContable wich user id is the same as the user id
        this.infoContableService.list().subscribe((data) => {
          let infoContable = data.find(
            (infoContable) => infoContable.user.id === this.infocontable.user.id
          );
          if (infoContable) {
            this.infocontable.idInfocontable = infoContable.idInfocontable;
            

            // just to avoid date problems with java (its start with 0 idkwhy)
            let fechaInicialDate = new Date(infoContable.fechainicio);
            fechaInicialDate.setDate(fechaInicialDate.getDate() + 1);
            let fechafinDate = new Date(infoContable.fechafin);
            fechafinDate.setDate(fechafinDate.getDate() + 1);

            console.log('infoContable: ', infoContable);

            let valPrePlazoDeTasaEfectiva: number = 0;
            if (
              [1, 15, 30, 60, 90, 120, 180, 360].includes(
                infoContable.plazodias
              )
            ) {
              valPrePlazoDeTasaEfectiva = infoContable.plazodias;
            }
            console.log(
              'valPrePlazoDeTasaEfectiva: ',
              valPrePlazoDeTasaEfectiva
            );
            console.log(infoContable.plazodias);

            this.form.setValue({
              valorpresente: infoContable.valorfuturo.toFixed(2),
              prePlazoDeTasaEfectiva: valPrePlazoDeTasaEfectiva.toString(),
              plazoDeTasaEfectiva: infoContable.plazodias,
              tasaefectiva: (infoContable.tasaefectiva  * 100).toFixed(6),
              fechaInicial: fechafinDate,
              fechafin: Date.now(),
            });

            // make form value fechaIncial inactive
            this.form.get('fechaInicial')?.disable();
          }
        });
      });
  }

  valorfuturoAtasaefectiva(): void {
    console.log('fechafin: ', this.fechafin);
    // calcular diferenca de dias entre fechaInicial y fechafin
    let diff = Math.abs(this.fechafin.getTime() - this.fechaInicial.getTime());
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
    this.enableAll();

    let fechaInicial = new Date(this.fechaInicial);
    fechaInicial.setDate(fechaInicial.getDate() - 1);
    this.fechaInicial = fechaInicial;
    let fechafin = new Date(this.fechafin);
    fechafin.setDate(fechafin.getDate());
    this.fechafin = fechafin;

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

        this.infoContableService.update(this.infocontable).subscribe(() => {
          this.infoContableService.list().subscribe((data) => {
            this.infoContableService.setList(data);
          });
        });
      });
  }

  swapdates() {
    // change dates in form
    let fechaInicial = this.form.value.fechaInicial;
    let fechafin = this.form.value.fechafin;
    this.form.patchValue({
      fechaInicial: fechafin,
      fechafin: fechaInicial,
    });
  }

  habilitarFecha() {
    this.form.get('fechaInicial')?.enable();
  }
}
