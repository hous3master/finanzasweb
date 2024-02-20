
    import { HistorialService } from './../../../services/historial.service';
    import { Historial } from './../../../models/historial';
    import { Component, OnInit, ViewChild } from '@angular/core';
    import { MatTableDataSource } from '@angular/material/table';
    import { MatPaginator } from '@angular/material/paginator';
    @Component({
    selector: 'app-listar-historial',
    templateUrl: './listar-historial.component.html',
    styleUrls: ['./listar-historial.component.css'],
    })
    export class ListarHistorialComponent implements OnInit {
    dataSource: MatTableDataSource<Historial> = new MatTableDataSource();
    displayedColumns: string[] = ['idHistorial','fecha','monto','user',
    'accion01','accion02'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private myService: HistorialService) {}

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
    