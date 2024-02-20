
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css'],
    })
    export class RoleComponent implements OnInit {
    constructor(public route: ActivatedRoute, public router: Router) {}
    ngOnInit(): void {}
    }
    