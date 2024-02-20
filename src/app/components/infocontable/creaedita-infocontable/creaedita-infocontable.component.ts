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
import { Infocontable } from '../../../models/Infocontable';
import { InfocontableService } from '../../../services/Infocontable.service';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-creaedita-Infocontable',
  templateUrl: './creaedita-Infocontable.component.html',
  styleUrls: ['./creaedita-Infocontable.component.css'],
})
export class CreaeditaInfocontableComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Infocontable: Infocontable = new Infocontable();
  mensaje: string = '';
  maxfechafin: Date = moment().add(-1, 'days').toDate();
  fechafin = new FormControl(new Date());
  maxfechainicio: Date = moment().add(-1, 'days').toDate();
  fechainicio = new FormControl(new Date());

  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[] = [];

  constructor(
    private InfocontableService: InfocontableService,
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
      idInfocontable: [''],

      plazodias: ['', Validators.required],

      fechafin: ['', Validators.required],

      fechainicio: ['', Validators.required],

      tasaefectiva: ['', Validators.required],

      valorpresente: ['', Validators.required],

      valorfuturo: ['', Validators.required],

      user: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.Infocontable.idInfocontable = this.form.value.idInfocontable;
      this.Infocontable.plazodias = this.form.value.plazodias;
      this.Infocontable.fechafin = this.form.value.fechafin;
      this.Infocontable.fechainicio = this.form.value.fechainicio;
      this.Infocontable.tasaefectiva = this.form.value.tasaefectiva;
      this.Infocontable.valorpresente = this.form.value.valorpresente;
      this.Infocontable.valorfuturo = this.form.value.valorfuturo;
      this.Infocontable.user.id = this.form.value.user; // Change for component with foreign keys

      if (this.edicion) {
        this.InfocontableService.update(this.Infocontable).subscribe(() => {
          this.InfocontableService.list().subscribe((data) => {
            this.InfocontableService.setList(data);
          });
        });
      } else {
        this.InfocontableService.insert(this.Infocontable).subscribe((data) => {
          this.InfocontableService.list().subscribe((data) => {
            this.InfocontableService.setList(data);
          });
        });
      }
      this.router.navigate(['/components/Infocontable']);
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
      this.InfocontableService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idInfocontable: new FormControl(data.idInfocontable),
          plazodias: new FormControl(data.plazodias),
          fechafin: new FormControl(data.fechafin),
          fechainicio: new FormControl(data.fechainicio),
          tasaefectiva: new FormControl(data.tasaefectiva),
          valorpresente: new FormControl(data.valorpresente),
          valorfuturo: new FormControl(data.valorfuturo),
          user: new FormControl(data.user.id), // Change for component with foreign keys
        });
      });
    }
  }
}
