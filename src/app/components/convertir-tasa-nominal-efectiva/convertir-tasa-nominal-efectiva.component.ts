import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infocontable } from 'src/app/models/Infocontable';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-convertir-tasa-nominal-efectiva',
  templateUrl: './convertir-tasa-nominal-efectiva.component.html',
  styleUrls: ['./convertir-tasa-nominal-efectiva.component.css'],
})
export class ConvertirTasaNominalEfectivaComponent implements OnInit {
  mensaje: string = '';
  form: FormGroup = new FormGroup({});

  infocontable: Infocontable = new Infocontable();

  cacheNumPlazoDeTasaNominal: number = 0;

  copiaMostrarNumPeriodoDeCapitalizacion: number = 0;
  copiaMostrarNumPlazoDeTasaNominal: number = 0;
  copiaMostrarNumTasaEfectivaRequerida: number = 0;
  copiaMostrarM: number = 0;
  copiaMostrarN: number = 0;
  copiaMostrarTEP: number = 0;
  copiaMostrarTEA: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private infoContableService: InfocontableService,
    private loginService: LoginService,
    private usersService: UsersService,
    private historialService: HistorialService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      diasPorAno: ['360', Validators.required],
      PrePlazoDeTasaNominal: ['360', Validators.required],
      NumPlazoDeTasaNominal: ['360', Validators.required],
      tasaNominal: ['', Validators.required],
      PrePeriodoDeCapitalizacion: ['1', Validators.required],
      NumPeriodoDeCapitalizacion: ['1', Validators.required],
      PreTasaEfectivaRequerida: ['360', Validators.required],
      NumTasaEfectivaRequerida: ['360', Validators.required],
    });
    this.disableAll();
    

    this.form.get('PrePlazoDeTasaNominal')?.valueChanges.subscribe((newValue) => {
      // update the value in the form
      this.form.patchValue({
        NumPlazoDeTasaNominal: parseInt(newValue),
      });
      // if the value is not especial (0), the disable editing
      if (parseInt(this.form.get('NumPlazoDeTasaNominal')?.value) == 0 ) {
        this.form.get('NumPlazoDeTasaNominal')?.enable();
      }
      else {
        this.form.get('NumPlazoDeTasaNominal')?.disable();
      }
    });

    this.form.get('PrePeriodoDeCapitalizacion')?.valueChanges.subscribe((newValue) => {
      // update the value in the form
      this.form.patchValue({
        NumPeriodoDeCapitalizacion: parseInt(newValue),
      });
      // if the value is not especial (0), the disable editing
      if (parseInt(this.form.get('NumPeriodoDeCapitalizacion')?.value) == 0 ) {
        this.form.get('NumPeriodoDeCapitalizacion')?.enable();
      }
      else {
        this.form.get('NumPeriodoDeCapitalizacion')?.disable();
      }
    });

    this.form.get('PreTasaEfectivaRequerida')?.valueChanges.subscribe((newValue) => {
      // update the value in the form
      this.form.patchValue({
        NumTasaEfectivaRequerida: parseInt(newValue),
      });
      // if the value is not especial (0), the disable editing
      if (parseInt(this.form.get('NumTasaEfectivaRequerida')?.value) == 0 ) {
        this.form.get('NumTasaEfectivaRequerida')?.enable();
      }
      else {
        this.form.get('NumTasaEfectivaRequerida')?.disable();
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
    this.enableAll();
    console.log(this.form.value.tasaNominal);
    console.log(this.form.value.NumPlazoDeTasaNominal);
    console.log(this.form.value.NumPeriodoDeCapitalizacion);
    console.log(this.form.value.NumTasaEfectivaRequerida);

    // m es el plazodetasanominal / periododecapitalizacion
    let m = this.form.value.NumPlazoDeTasaNominal / this.form.value.NumPeriodoDeCapitalizacion;

    // n es el tasaefectivarequerida / periododecapitalizacion
    let n = this.form.value.NumTasaEfectivaRequerida / this.form.value.NumPeriodoDeCapitalizacion;

    // TEP es (1 + tasanominal / m) ^ n - 1
    // tasa nominal se divide entre 100 para convertir a porcentaje
    let TEP = Math.pow(1 + ((this.form.value.tasaNominal / 100) / m), n) - 1;
    console.log('TEP: ', TEP);

    // TEA es la tasa nominal en un ano
    let nAnual = this.form.value.diasPorAno / this.form.value.NumPeriodoDeCapitalizacion;
    let TEA = Math.pow(1 + ((this.form.value.tasaNominal / 100) / m), nAnual) - 1;
    console.log('TEA: ', TEA);

    // copiar valores para mostrar en el html
    this.copiaMostrarNumPeriodoDeCapitalizacion = this.form.value.NumPeriodoDeCapitalizacion;
    this.copiaMostrarNumPlazoDeTasaNominal = this.form.value.NumPlazoDeTasaNominal;
    this.copiaMostrarNumTasaEfectivaRequerida = this.form.value.NumTasaEfectivaRequerida;
    this.copiaMostrarM = m;
    this.copiaMostrarN = n;
    this.copiaMostrarTEP = TEP;
    this.copiaMostrarTEA = TEA;

    

    this.disableAll();
    }
    else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  enableAll(): void {
    this.form.get('NumPlazoDeTasaNominal')?.enable();
    this.form.get('NumPeriodoDeCapitalizacion')?.enable();
    this.form.get('NumTasaEfectivaRequerida')?.enable();
  }

  disableAll(): void {
    this.copiaMostrarNumPeriodoDeCapitalizacion = this.form.value.NumPeriodoDeCapitalizacion;
    this.copiaMostrarNumPlazoDeTasaNominal = this.form.value.NumPlazoDeTasaNominal;
    this.copiaMostrarNumTasaEfectivaRequerida = this.form.value.NumTasaEfectivaRequerida;

    this.form.get('NumPlazoDeTasaNominal')?.disable();
    this.form.get('NumPeriodoDeCapitalizacion')?.disable();
    this.form.get('NumTasaEfectivaRequerida')?.disable();

    
  }

}
