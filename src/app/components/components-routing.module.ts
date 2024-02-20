import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { CreaeditaHistorialComponent } from './historial/creaedita-historial/creaedita-historial.component';
import { UsersComponent } from './users/users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { RoleComponent } from './role/role.component';
import { CreaeditaRoleComponent } from './role/creaedita-role/creaedita-role.component';
import { RegistroDatosComponent } from './registro-datos/registro-datos.component';
import { EditarPlanDePagosComponent } from './editar-plan-de-pagos/editar-plan-de-pagos.component';
import { CreaeditaInfocontableComponent } from './Infocontable/creaedita-Infocontable/creaedita-Infocontable.component';
import { InfocontableComponent } from './Infocontable/Infocontable.component';
import { AlterarFlujoDeFondosComponent } from './alterar-flujo-de-fondos/alterar-flujo-de-fondos.component';
import { EstadoDeCuentaComponent } from './estado-de-cuenta/estado-de-cuenta.component';
import { ConvertirTasaNominalEfectivaComponent } from './convertir-tasa-nominal-efectiva/convertir-tasa-nominal-efectiva.component';

const routes: Routes = [
  {
    path: 'Infocontable',
    component: InfocontableComponent,
    children: [
      { path: 'nuevo', component: CreaeditaInfocontableComponent },
      { path: 'ediciones/:id', component: CreaeditaInfocontableComponent },
    ],
  },

  {
    path: 'historial',
    component: HistorialComponent,
    children: [
      { path: 'nuevo', component: CreaeditaHistorialComponent },
      { path: 'ediciones/:id', component: CreaeditaHistorialComponent },
    ],
  },

  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUsersComponent },
      { path: 'ediciones/:id', component: CreaeditaUsersComponent },
    ],
  },

  {
    path: 'role',
    component: RoleComponent,
    children: [
      { path: 'nuevo', component: CreaeditaRoleComponent },
      { path: 'ediciones/:id', component: CreaeditaRoleComponent },
    ],
  },
  {
    path: 'registrodatos',
    component: RegistroDatosComponent,
  },
  {
    path: 'editarplandepagos',
    component: EditarPlanDePagosComponent,
  },
  {
    path: 'flujodefondos',
    component: AlterarFlujoDeFondosComponent,
  },
  {
    path: 'estadodecuenta',
    component: EstadoDeCuentaComponent,
  },
  {
    path: 'convertir',
    component: ConvertirTasaNominalEfectivaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
