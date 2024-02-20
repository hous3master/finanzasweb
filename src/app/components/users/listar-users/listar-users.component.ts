
    import { UsersService } from './../../../services/users.service';
    import { Users } from './../../../models/users';
    import { Component, OnInit, ViewChild } from '@angular/core';
    import { MatTableDataSource } from '@angular/material/table';
    import { MatPaginator } from '@angular/material/paginator';
    @Component({
    selector: 'app-listar-users',
    templateUrl: './listar-users.component.html',
    styleUrls: ['./listar-users.component.css'],
    })
    export class ListarUsersComponent implements OnInit {
    dataSource: MatTableDataSource<Users> = new MatTableDataSource();
    displayedColumns: string[] = ['id','username','password','enabled',
    'accion01','accion02'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private myService: UsersService) {}

    ngOnInit(): void {
        this.myService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        });
        this.myService.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        }); 
    }
    eliminar(id: number) {
        this.myService.delete(id).subscribe((data) => {
        this.myService.list().subscribe((data) => {
            this.myService.setList(data);
        });
        });
    }
    filter(en: any) {
        this.dataSource.filter = en.target.value.trim();
    }
    }
    