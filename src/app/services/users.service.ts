import { Users } from './../models/users';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${base_url}/users`;
  private listaCambio = new Subject<Users[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Users[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(users: Users) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, users, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Users>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(users: Users) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, users, {
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

  /* @GetMapping("/buscar/{username}")
        public UsersDTO buscarPorUsername(@PathVariable("username") String username) {
            Users user = myService.findByUsername(username);
            if (user != null) {
                ModelMapper m = new ModelMapper();
                return m.map(user, UsersDTO.class);
            } else {
                // Manejar el caso en el que el usuario no existe
                return null;
            }
        } */

  buscarPorUsername(username: string) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Users>(`${this.url}/buscar/${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
