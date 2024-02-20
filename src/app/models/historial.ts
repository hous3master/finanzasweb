import { Users } from './users';
export class Historial {
  idHistorial: number = 0;
  fecha: Date = new Date(Date.now());
  monto: number = 0;
  user: Users = new Users();
}
