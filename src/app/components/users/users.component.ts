
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    @Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    })
    export class UsersComponent implements OnInit {
    constructor(public route: ActivatedRoute, public router: Router) {}
    ngOnInit(): void {}
    }
    