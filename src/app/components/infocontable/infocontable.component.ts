
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
    selector: 'app-Infocontable',
    templateUrl: './Infocontable.component.html',
    styleUrls: ['./Infocontable.component.css'],
    })
    export class InfocontableComponent implements OnInit {
    constructor(public route: ActivatedRoute, public router: Router) {}
    ngOnInit(): void {}
    }
    