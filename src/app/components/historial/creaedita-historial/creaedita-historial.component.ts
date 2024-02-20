import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Historial } from '../../../models/historial';
import { HistorialService } from '../../../services/historial.service';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-creaedita-historial',
  templateUrl: './creaedita-historial.component.html',
  styleUrls: ['./creaedita-historial.component.css'],
})
export class CreaeditaHistorialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  historial: Historial = new Historial();
  mensaje: string = '';
  maxfecha: Date = moment().add(-1, 'days').toDate();
  fecha = new FormControl(new Date());

  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[] = [];

  constructor(
    private historialService: HistorialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.usersService.list().subscribe((data) => {
      this.listaUsers = data;
    });

    this.form = this.formBuilder.group({
      idHistorial: [''],

      fecha: ['', Validators.required],

      monto: ['', Validators.required],

      user: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.historial.idHistorial = this.form.value.idHistorial;
      this.historial.fecha = this.form.value.fecha;
      this.historial.monto = this.form.value.monto;
      this.historial.user.id = this.form.value.user; // Change for component with foreign keys

      if (this.edicion) {
        this.historialService.update(this.historial).subscribe(() => {
          this.historialService.list().subscribe((data) => {
            this.historialService.setList(data);
          });
        });
      } else {
        this.historialService.insert(this.historial).subscribe((data) => {
          this.historialService.list().subscribe((data) => {
            this.historialService.setList(data);
          });
        });
      }
      this.router.navigate(['/components/historial']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.historialService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idHistorial: new FormControl(data.idHistorial),
          fecha: new FormControl(data.fecha),
          monto: new FormControl(data.monto),
          user: new FormControl(data.user.id), // Change for component with foreign keys
        });
      });
    }
  }
}
