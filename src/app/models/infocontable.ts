import { Users } from './users';
export class Infocontable {
  idInfocontable: number = 0;
  plazodias: number = 0;
  fechafin: Date = new Date(Date.now());
  fechainicio: Date = new Date(Date.now());
  tasaefectiva: number = 0;
  valorpresente: number = 0;
  valorfuturo: number = 0;
  user: Users = new Users();
}
