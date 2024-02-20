
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.css'],
    })
    export class HistorialComponent implements OnInit {
    constructor(public route: ActivatedRoute, public router: Router) {}
    ngOnInit(): void {}
    }
    