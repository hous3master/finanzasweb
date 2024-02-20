import { Infocontable } from './../models/Infocontable';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class InfocontableService {
  private url = `${base_url}/infocontable`;
  private listaCambio = new Subject<Infocontable[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Infocontable[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(Infocontable: Infocontable) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, Infocontable, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Infocontable[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Infocontable>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(Infocontable: Infocontable) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, Infocontable, {
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
