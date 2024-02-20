
    import { InfocontableService } from './../../../services/Infocontable.service';
    import { Infocontable } from './../../../models/Infocontable';
    import { Component, OnInit, ViewChild } from '@angular/core';
    import { MatTableDataSource } from '@angular/material/table';
    import { MatPaginator } from '@angular/material/paginator';
    @Component({
    selector: 'app-listar-Infocontable',
    templateUrl: './listar-Infocontable.component.html',
    styleUrls: ['./listar-Infocontable.component.css'],
    })
    export class ListarInfocontableComponent implements OnInit {
    dataSource: MatTableDataSource<Infocontable> = new MatTableDataSource();
    displayedColumns: string[] = ['idInfocontable','plazodias','fechafin','fechainicio','tasaefectiva','valorpresente','valorfuturo','user',
    'accion01','accion02'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private myService: InfocontableService) {}

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
    