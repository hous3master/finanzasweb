
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
    import { Role } from '../../../models/role';
    import { RoleService } from '../../../services/role.service';
    import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

    @Component({
        selector: 'app-creaedita-role',
        templateUrl: './creaedita-role.component.html',
        styleUrls: ['./creaedita-role.component.css'],
    })
    export class CreaeditaRoleComponent implements OnInit {
        form: FormGroup = new FormGroup({});
        role: Role = new Role();
        mensaje: string = '';
    
    id: number = 0;
    edicion: boolean = false;
    listaUsers: Users[]=[];

    constructor(
        private roleService: RoleService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
    private usersService: UsersService) {}

    ngOnInit(): void {
        this.route.params.subscribe((data: Params) => {
            this.id = data['id'];
            this.edicion = data['id'] != null;
            this.init();
        });
    
            this.usersService.list().subscribe((data) => {
                this.listaUsers = data;
            })
            
        this.form = this.formBuilder.group({
    
            id: [''],
    
                    rol: ['', Validators.required],
        
                    user: ['', Validators.required],
        
        });
    }

    aceptar(): void {
        if (this.form.valid) {
    this.role.id = this.form.value.id;
this.role.rol = this.form.value.rol;
this.role.user.id = this.form.value.user; // Change for component with foreign keys

            if (this.edicion) {
                this.roleService.update(this.role).subscribe(() => {
                    this.roleService.list().subscribe((data) => {
                        this.roleService.setList(data);
                    });
                });
            } else {
                this.roleService.insert(this.role).subscribe((data) => {
                    this.roleService.list().subscribe((data) => {
                        this.roleService.setList(data);
                    });
                });
            }
            this.router.navigate(['/components/role']);
        }
        else {
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
            this.roleService.listId(this.id).subscribe((data) => {
                this.form = new FormGroup({
    id: new FormControl(data.id),
rol: new FormControl(data.rol),
user: new FormControl(data.user.id), // Change for component with foreign keys

    });
    });
    }
    }
    }
    