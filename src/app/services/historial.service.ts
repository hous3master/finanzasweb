
    import { Historial } from './../models/historial';
    import { environment } from './../../environments/environment';
    import { Injectable } from '@angular/core';
    import { Observable, Subject } from 'rxjs';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    const base_url = environment.base;
    @Injectable({
    providedIn: 'root',
    })
    export class HistorialService {
    private url = `${base_url}/historial`;
    private listaCambio = new Subject<Historial[]>();
    constructor(private http: HttpClient) {}
    list() {
        let token = sessionStorage.getItem('token');

        return this.http.get<Historial[]>(this.url, {
        headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
        });
    }
    insert(historial: Historial) {
        let token = sessionStorage.getItem('token');

        return this.http.post(this.url, historial, {
        headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
        });
    }
    setList(listaNueva: Historial[]) {
        this.listaCambio.next(listaNueva);
    }
    getList() {
        return this.listaCambio.asObservable();
    }
    listId(id: number) {
        let token = sessionStorage.getItem('token');

        return this.http.get<Historial>(`${this.url}/${id}`, {
        headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
        });
    }
    update(historial: Historial) {
        let token = sessionStorage.getItem('token');

        return this.http.put(this.url, historial, {
        headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
        });
    }
    delete(id: number) {
        let token = sessionStorage.getItem('token');

        return this.http.delete(`${this.url}/${id}`, {
        headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
        });
    }
    }
    